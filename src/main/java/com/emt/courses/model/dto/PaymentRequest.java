package com.emt.courses.model.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    Integer customerId;

    String email;

    String token;

    int amount;
}
