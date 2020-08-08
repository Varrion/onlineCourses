package com.emt.courses.service;

import com.emt.courses.model.dto.PaymentRequest;
import com.stripe.model.Coupon;

public interface StripeService {

    public String createCustomer(String email, String token);

    public String createSubscription(String customerId, String plan, String coupon);

    public boolean cancelSubscription(String subscriptionId);

    public Coupon retrieveCoupon(String code);

    public String createCharge(PaymentRequest paymentRequest);
}
