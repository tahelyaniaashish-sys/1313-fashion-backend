import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase';
import { OrderDetails, StoreConfig } from '../types';
import { DEFAULT_STORE_CONFIG } from '../data/products';

// Firestore rejects any field whose value is `undefined` (only `null` or an
// omitted key is allowed). Optional fields elsewhere in the app (e.g. a
// product's placementOption, colorway image, etc.) are often `undefined`
// rather than omitted, so a plain setDoc(order) can throw. A JSON round-trip
// is a simple, safe way to drop every undefined key, at any nesting depth.
function sanitizeForFirestore<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

const CONFIG_DOC_REF = doc(db, 'config', 'store');
const ORDERS_COLLECTION_REF = collection(db, 'orders');

/**
 * Store config (UPI ID, WhatsApp numbers, etc). This document is publicly
 * READABLE (customers need the UPI ID to pay) but only WRITABLE by an
 * authenticated admin — enforced by Firestore security rules, not by this
 * code. See firestore.rules.
 */
export function subscribeStoreConfig(
  onChange: (config: StoreConfig) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  return onSnapshot(
    CONFIG_DOC_REF,
    (snap) => {
      if (snap.exists()) {
        onChange({ ...DEFAULT_STORE_CONFIG, ...(snap.data() as Partial<StoreConfig>) });
      } else {
        onChange(DEFAULT_STORE_CONFIG);
      }
    },
    (err) => {
      // Falls back to defaults on any permission/network error so the
      // storefront still works even if config hasn't been created yet.
      onChange(DEFAULT_STORE_CONFIG);
      onError?.(err);
    }
  );
}

export async function saveStoreConfig(config: StoreConfig): Promise<void> {
  // Requires an authenticated admin session — rejected by Firestore rules otherwise.
  await setDoc(CONFIG_DOC_REF, config, { merge: true });
}

/**
 * Orders collection. Firestore rules only allow:
 *  - create: anyone (so checkout can submit a new order)
 *  - read / update / delete: authenticated admin only
 * So this subscription will only return data once the admin is logged in;
 * for anonymous visitors the listener will error out / return nothing.
 */
export function subscribeOrders(
  onChange: (orders: OrderDetails[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const q = query(ORDERS_COLLECTION_REF, orderBy('timestamp', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const orders = snap.docs.map((d) => d.data() as OrderDetails);
      onChange(orders);
    },
    (err) => {
      onChange([]);
      onError?.(err);
    }
  );
}

// Anyone can create a new order (this is how checkout submits it) —
// but they cannot read back other people's orders. Document ID = orderNumber
// so re-submits update rather than duplicate.
export async function saveNewOrder(order: OrderDetails): Promise<void> {
  const ref = doc(db, 'orders', order.orderNumber);
  await setDoc(ref, sanitizeForFirestore(order));
}

// Admin-only: update order/payment status.
export async function updateOrderStatus(
  orderNumber: string,
  newStatus: 'NEW' | 'ACCEPTED' | 'DISPATCHED' | 'DELIVERED',
  newPaymentStatus?: 'PAID' | 'PENDING'
): Promise<void> {
  const ref = doc(db, 'orders', orderNumber);
  const updates: Partial<OrderDetails> = { orderStatus: newStatus };
  if (newPaymentStatus) updates.paymentStatus = newPaymentStatus;
  await updateDoc(ref, updates);
}
