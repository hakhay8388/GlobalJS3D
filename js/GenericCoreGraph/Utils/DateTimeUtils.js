
function DateTimeUtils() {
}

DateTimeUtils.GetDate = function ()
{
        'use strict';

        var date;

        try {
            date = tizen.time.getCurrentDateTime();
        } catch (err) {
            date = new Date();
        }

        return date;
 }
