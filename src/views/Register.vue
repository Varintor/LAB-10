<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
const messageStore = useMessageStore()
const router = useRouter()
const validatationSchema = yup.object({
firstname: yup.string().required('First name is required'),
lastname: yup.string().required('Last name is required'),
email: yup.string().required('The Email is required'),
  password: yup.string().required('Password is required')
})
const {errors, handleSubmit} = useForm({
  validationSchema :validatationSchema,initialValues: {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }
})
const {value: firstname} = useField<string>('firstname')
const {value: lastname} = useField<string>('lastname')
const {value: email} = useField<string>('email')
const {value: password} = useField<string>('password')
const authStore = useAuthStore()
const onSubmit = handleSubmit((values) => {
  authStore.register(values.firstname,values.lastname,values.email, values.password)
  .then(() => {
    console.log('register successful')
    router.push({name: 'login'})
  }).catch(() => {
    messageStore.updateMessage('Could not register.')
    setTimeout(() => {
      messageStore.resetMessage()
    }, 3000)
  })
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign up to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label
            for="firstname"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            firstname 
          </label>
          <InputText
            type="text"
            v-model="firstname"
            placeholder="firstname" :error = "errors['firstname']"
          ></InputText>
        </div>
        <div>
          <label
            for="lastname"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            lastname
          </label>
          <InputText
            type="text"
            v-model="lastname"
            placeholder="lastname" :error = "errors['lastname']"
          ></InputText>
        </div>
        <!-- ✅ Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <InputText
            type="text"
            v-model="email"
            placeholder="Email address" :error = "errors['email']"
          ></InputText>
        </div>

        <!-- ✅ Password -->
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>

          <InputText
            type="password"
            v-model="password"
            placeholder="Password" :error = "errors['password']"
          ></InputText>
        </div>

        <!-- ✅ Sign-in button -->
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <a
          href="/login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Try to Login here</a
        >
      </p>
    </div>
  </div>
</template>
