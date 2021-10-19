<template>
    <div>
        <form @submit.stop.prevent="signin()">
            <!-- username -->
            <o-field label="Usuario o correo">
                <o-input v-model="form.username"></o-input>
            </o-field>
            <!-- end username -->
            
            <!-- password -->
            <o-field label="Contraseña">
                <o-input v-model="form.password" type="password"></o-input>
            </o-field>
            <!-- end password -->

            <error v-if="form.error" class="text-center m-2">
                Tu usuario o contraseña son incorrectos, verifícalos e intenta de nuevo.
            </error>

            <o-button variant="primary" native-type="submit">
                <span v-if="form.loading">
                    <o-icon icon="loading" spin />
                </span>
                <span v-else>Entrar</span>
            </o-button>
        </form>
    </div>
</template>

<script>
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

    methods: {
        async signin() {
            this.form.loading = true
            const { data } = await this.$apollo.mutate({
                mutation: TOKEN_AUTH,
                variables: {
                    username: this.form.username,
                    password: this.form.password
                }
            })
            if (data.tokenAuth.token) {
                // login
            } else {
                this.form.error = true
            }
            this.form.loading = false
        }
    }
}
</script>