package com.getcapacitor.community.classes.results;

import com.getcapacitor.JSObject;
import com.getcapacitor.community.interfaces.Result;

import java.util.Date;

public class LicenseExpirationDateResult implements Result {

    private final Date licenseExpirationDate;

    public LicenseExpirationDateResult(Date licenseExpirationDate) {
        this.licenseExpirationDate = licenseExpirationDate;
    }

    @Override
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        if (licenseExpirationDate != null) result.put("licenseExpirationDate", licenseExpirationDate.toString());

        return result;
    }
}
