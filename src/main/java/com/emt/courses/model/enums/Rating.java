package com.emt.courses.model.enums;

import lombok.Getter;

@Getter
public enum Rating {
    None,
    Bad,
    NotBad,
    Good,
    VeryGood,
    Perfect;

    public static Rating fromInteger(int x) {
        switch(x) {
            case 1:
                return Bad;
            case 2:
                return NotBad;
            case 3:
                return Good;
            case 4:
                return VeryGood;
            case 5:
                return Perfect;
        }
        return null;
    }
}
