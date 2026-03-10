CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Inventory Service Schema
CREATE TABLE IF NOT EXISTS inventory (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL,
    warehouse_id text DEFAULT 'DEFAULT',
    available_qty integer NOT NULL DEFAULT 0,
    reserved_qty integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reservations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id uuid NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
    order_id uuid,
    quantity integer NOT NULL,
    status text DEFAULT 'RESERVED',
    created_at timestamptz DEFAULT now(),
    expires_at timestamptz
);

CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_reservations_order ON reservations(order_id);
CREATE INDEX idx_reservations_status ON reservations(status);
