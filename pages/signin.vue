<template>
    <div>
        <form @submit.stop.prevent="signin()">
            <!-- username -->
            <o-field label="Usuario o correo">
                <o-input v-model="$v.form.username.$model"></o-input>
            </o-field>
            <!-- end username -->
            
            <!-- password -->
            <o-field label="Contraseña">
                <o-input v-model="$v.form.password.$model" type="password"></o-input>
            </o-field>
            <!-- end password -->

            <error v-if="form.error" class="text-center m-2">
                Tu usuario o contraseña son incorrectos, verifícalos e intenta de nuevo.
            </error>

            <o-button variant="primary" native-type="submit" :disabled="$v.form.$invalid">
                <span v-if="form.loading">
                    <o-icon icon="loading" spin />
                </span>
                <span v-else>Entrar</span>
            </o-button>

            <p>
                <nuxt-link to="/signup">Registrarme</nuxt-link>
            </p>
        </form>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import TOKEN_AUTH from '~/apollo/users/mutations/tokenAuth.js'
export default {
    data() {
        return {
            form: {
                username: null,
                password: null,
                loading: false,
                error: false
            }
        }
    },

    validations: {
        form: {
            username: { required },
            password: { required, minLength: minLength(8) }
        }
    },

    methods: {
        async signin() {
            if (!this.$v.form.$invalid) {
                this.form.loading = true
                const { data } = await this.$apollo.mutate({
                    mutation: TOKEN_AUTH,
                    variables: {
                        username: this.form.username,
                        password: this.form.password
                    }
                })
                const token = data.tokenAuth.token
                if (token) {
                    // Login in frontend
                    this.$auth.setUserToken(token)

                    // Redirect if cookie is defined
                    const redirect = this.$cookies.get('auth.redirect')
                    if (!redirect) {
                        window.location = `/${data.tokenAuth.user.username}`
                    } else {
                        let url = redirect + '?'
                        for (const i in this.$route.query) {
                            url += i + '=' + this.$route.query[i] + '&'
                        }
                        window.location = url
                    }
                } else {
                    this.form.error = true
                }
                this.form.loading = false
            }
        }
    }
}
</script>