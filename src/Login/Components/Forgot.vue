<template>
<div>
    <div v-if="success" id="error-message-container">
        <div id="error-message" class="ui message inverted green secondary segment">
            <i class="inverted close icon" @click="hideMessage"></i>
            <div class="">Check your emails for a reset link</div>
        </div>
    </div>
    <div id="login-form">
        <div class="ui segments">
            <div class="ui segment logo-background">
                <div id="login-logo">Welcome to Croud Control</div>
            </div>
            <div class="ui segment padded basic">
                <form class="ui form">
                    <p>Enter your email address and we will send you a link to reset your password</p>
                    <div class="ui field">
                        <input type="text" name="email" placeholder="Email" v-model="username">
                    </div>
                </form>
            </div>
            <div class="ui segment padded">
                <button v-bind:class="['ui','button', 'fluid', 'blue', {'loading': loading}]" @click="submit">Send Password Reset Link</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        username: {},
    },

    data() {
        return {
            loading: false,
            success: false,
        }
    },

    methods: {
        submit() {
            this.loading = true;

            this.$http.post(`//${gateway_url}/password/email`, {
                username: this.username
            }).then((response) => {
                this.loading = false;
                this.success = response.data.success;
                this.error = !response.data.success;
            }, () => {
                this.loading = false;
                this.error = true;
            });
        },

        hideMessage() {
            this.success = false
        },
    },
}
</script>
