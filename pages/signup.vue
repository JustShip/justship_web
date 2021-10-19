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

                <o-button>
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
                        El código no es correcto, intenta de nuevo.
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
export default {
    auth: false,

    data() {
        return {
            step: 1,
            signupForm: {
                email: null,
                password: null,
                code: null,
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
        signup() {},
        emailCodeAuth() {}
    }
}
</script>