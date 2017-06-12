/**
 * Created by lyc on 17-6-10.
 */
import jquery from '../api';
const $ = jquery.jQuery;

import common from './common';

const action = {
    getCaptcha: function () {
        return new Promise(function (resolve) {
            var url = common.url.webserviceUrl + '/service/verifyCode?' + Math.random();
            resolve(url);
        });
    },

    login: function (username, password, captcha) {
        var param = {
            username: username,
            password: password,
            captcha: captcha
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: common.url.webserviceUrl + '/login/login',
                type: 'post',
                data: param,
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
};

export default {
    action
}
