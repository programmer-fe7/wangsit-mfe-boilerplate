<script setup lang="ts">
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
} from '@fewangsit/wangsvue';
import { ref } from 'vue';

type OptionValue = string | number;

const visible = defineModel<boolean>('visible', { default: false });
const nonnullablevalue = ref<OptionValue>();
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :aside-right-width="600"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    header="Edit Asset"
    severity="success"
    width="medium"
  >
    <template #fields>
      <div class="grid grid-rows-3 gap-4">
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="groups"
            label="Group"
            option-label="label"
            option-value="value"
          />
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="categories"
            label="Category"
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="name"
            label="Name"
            option-label="label"
            option-value="value"
          />
          <InputText
            :mandatory="false"
            field-name="aliasName"
            label="Alias Name"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="brands"
            label="Brand"
            option-label="label"
            option-value="value"
          />
          <Dropdown
            v-model="nonnullablevalue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="models"
            label="Model/Type"
            option-label="label"
            option-value="value"
          />
        </div>
      </div>
      <ImageCompressor :mandatory="false" multiple label="Foto/>
    </template>
  </DialogForm>
</template>
