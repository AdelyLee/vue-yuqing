/**
 * Created by lyc on 17-6-11.
 */
import jQuery from 'jquery';

jQuery.ajaxSetup({
    beforeSend: function (request) {
        request.setRequestHeader("Authorization", localStorage.getItem("token"));
    },
    error: function (error) {
        console.log("ajaxSetup error", error);
        if (error.status != 500) {
            window.location.href = "../module/login.html";
        }
    }
});

export default {jQuery}

