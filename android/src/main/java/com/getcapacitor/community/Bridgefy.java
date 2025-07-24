package com.getcapacitor.community;

import com.getcapacitor.Logger;

public class Bridgefy {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
