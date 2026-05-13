<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Receipt Order #{{ $order->id }}</title>
    <style>
        body { font-family: sans-serif; margin: 0; padding: 20px; color: #1a1a1a; }
        .header { text-align: center; border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 16px; }
        .header h1 { margin: 0 0 4px; font-size: 22px; }
        .header p { margin: 2px 0; font-size: 12px; color: #666; }
        .info { margin-bottom: 16px; }
        .info td { padding: 4px 8px; font-size: 13px; vertical-align: top; }
        .info .label { color: #666; white-space: nowrap; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
        th { background: #f59e0b; color: #000; padding: 8px; text-align: left; font-size: 12px; }
        td { padding: 8px; border-bottom: 1px solid #ddd; font-size: 13px; vertical-align: top; }
        .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 12px; }
        .footer { margin-top: 24px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #ddd; padding-top: 12px; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: bold; }
        .badge-hot { background: #fef3c7; color: #d97706; }
        .badge-cold { background: #cffafe; color: #0891b2; }
        .badge-sweet { background: #fef3c7; color: #b45309; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Taman Ana</h1>
        <p>Lot 12260 Jalan Perak Kanan, Bukit Changgang, 42700 Banting, Selangor</p>
        <p>Receipt &mdash; Order #{{ $order->id }}</p>
    </div>

    <table class="info">
        <tr><td class="label">Customer</td><td>{{ $order->customer_name }}</td></tr>
        <tr><td class="label">Contact</td><td>{{ $order->customer_contact }}</td></tr>
        <tr><td class="label">Type</td><td>{{ $order->order_type === 'delivery' ? 'Delivery ('.$order->delivery_area.')' : 'Self Pickup' }}</td></tr>
        @if($order->order_type === 'delivery' && $order->customer_address)
        <tr><td class="label">Address</td><td>{{ $order->customer_address }}</td></tr>
        @endif
        <tr><td class="label">Payment</td><td>{{ $order->payment_method === 'duitnow' ? 'Online Banking / DuitNow' : 'Cash' }}</td></tr>
        <tr><td class="label">Date</td><td>{{ $order->created_at->format('d/m/Y h:i A') }}</td></tr>
        <tr><td class="label">Status</td><td>{{ ucfirst($order->status) }}</td></tr>
    </table>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $i => $item)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>
                    <strong>{{ $item->product_name }}</strong>
                    <div style="margin-top:2px;">
                        <span class="badge {{ $item->temperature === 'hot' ? 'badge-hot' : 'badge-cold' }}">{{ $item->temperature === 'hot' ? '🔥 Hot' : '🧊 Cold' }}</span>
                        <span class="badge badge-sweet">{{ ucfirst($item->sweetness) }}</span>
                        @if($item->extra_milk)<span class="badge">+Milk</span>@endif
                        @if($item->toppings)
                            @foreach($item->toppings as $t)
                                <span class="badge">+{{ str_replace('_', ' ', ucfirst($t)) }}</span>
                            @endforeach
                        @endif
                    </div>
                    @if($item->remark)
                        <div style="font-size:11px;color:#999;font-style:italic;">"{{ $item->remark }}"</div>
                    @endif
                </td>
                <td>{{ $item->quantity }}</td>
                <td>RM {{ number_format($item->unit_price, 2) }}</td>
                <td>RM {{ number_format($item->subtotal, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">Total: RM {{ number_format($order->total_price, 2) }}</div>

    @if($order->notes)
        <p style="font-size:12px;color:#666;margin-top:12px;"><strong>Notes:</strong> {{ $order->notes }}</p>
    @endif

    <div class="footer">
        Thank you for ordering at Taman Ana! &mdash; {{ now()->format('d/m/Y h:i A') }}
    </div>
</body>
</html>
