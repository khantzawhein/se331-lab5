<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()
const authStore = useAuthStore()

import * as yup from 'yup'

import { useField, useForm } from 'vee-validate'
import { RouterLink, useRouter } from 'vue-router'

const validationSchema = yup.object({
  username: yup.string().required('The username is required'),
  email: yup.string().required('The email is required').email('The email is not valid'),
  firstname: yup.string().required('The firstname is required'),
  lastname: yup.string().required('The lastname is required'),
  password: yup
    .string()
    .required('The password is required')
    .min(6, 'The password must be at least 6 characters')
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    email: '',
    password: ''
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: username } = useField<string>('username')

const router = useRouter()
const onSubmit = handleSubmit((values) => {
  authStore
    .register(values.email, values.password, values.username, values.firstname, values.lastname)
    .then(() => {
      router.push({ name: 'event-list-view' })
    })
    .catch((err) => {
      messageStore.updateMessage('could not register')

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

      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register new account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900"
            >First Name</label
          >

          <InputText type="text" v-model="firstname" :error="errors['firstname']"></InputText>
        </div>
        <div>
          <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900"
            >Last Name</label
          >

          <InputText type="text" v-model="lastname" :error="errors['lastname']"></InputText>
        </div>
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900"
            >Username</label
          >

          <InputText type="username" v-model="username" :error="errors['username']"></InputText>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>

          <InputText type="email" v-model="email" :error="errors['email']"></InputText>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>

          <InputText
            type="password"
            v-model="password"
            placeholder="Password"
            :error="errors['password']"
          />
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?
        <RouterLink
          to="/login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Try to sign in here
        </RouterLink>
      </p>
    </div>
  </div>
</template>
