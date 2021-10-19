<template>
    <div>
        <!-- step 1 -->
        <div v-if="step === 1">
            <form @submit.stop.prevent="signup()">
                <o-field label="Correo">
                    <o-input v-model="signupForm.email" type="email"></o-input>
                </o-field>

                <o-field label="Contraseña">
                    <o-input v-model="signupForm.password" type="password" password-reveal></o-input>
                </o-field>                    

                <o-button variant="primary" native-type="submit">
                    <o-icon v-if="signupForm.loading" icon="loading" spin></o-icon>
                    <span v-else>Crear cuenta</span>
                </o-button>
            </form>

            <p>
                <nuxt-link to="/signin">Ya tengo una cuenta</nuxt-link>
            </p>
        </div>
        <!-- end step 1 -->

        <!-- step 2 -->
        <transition name="fade">
            <div v-if="step === 2" :class="`${ {transitioned: 'ease'} }`">
                <form @submit.stop.prevent="emailCodeAuth()">
                    <p>Revisa tu correo y pega el código de confirmación aquí.</p>

                    <o-field>
                        <o-input v-model="codeForm.code"></o-input>
                    </o-field>

                    <error v-if="signupForm.codeError">
                        El código es incorrecto, intenta de nuevo.
                    </error>
                    
                    <o-button variant="primary" native-type="submit">
                        <o-icon v-if="codeForm.loading" icon="loading" spin></o-icon>
                        <span v-else>Confirmar correo</span>                        
                    </o-button>
                </form>
            </div>
        </transition>
        <!-- end step 2 -->
    </div>
</template>

<script>
import SIGNUP from '~/apollo/auth/mutations/signUp.js'
import EMAIL_CODE_AUTH from '~/apollo/auth/mutations/emailCodeAuth'
export default {
    auth: false,

    data() {
        return {
            step: 1,
            signupForm: {
                email: null,
                password: null,
                codeError: false,
                loading: false,
            },
            codeForm: {
                code: null,
                codeError: false,
                loading: false
            }
        }
    },

    methods: {
        async signup() {
            this.signupForm.loading = true

            // Signup user
            const { data } = await this.$apollo.mutate({
                mutation: SIGNUP,
                variables: {
                    email: this.signupForm.email,
                    password: this.signupForm.password
                }
            })

            switch (data.signUp.status) {
                case 'ok': {
                    this.step = 2
                    this.codeForm.code = null                
                    break
                }
                case 'already-registered': {
                    // TODO
                    break
                }
            }

            this.signupForm.loading = false
        },

        async emailCodeAuth() {
            this.codeForm.loading = true

            const { data } = await this.$apollo.mutate({
                mutation: EMAIL_CODE_AUTH,
                variables: {
                    email: this.signupForm.email,
                    code: this.codeForm.code
                }
            })

            switch (data.emailCodeAuth.status) {
                case 'ok': {
                    // TODO: login
                    this.codeForm.codeError = false
                    break
                }
                case 'wrong-code': {
                    this.signupForm.codeError = true
                    break
                }
            }

            this.codeForm.loading = false
        }
    }
}
</script>