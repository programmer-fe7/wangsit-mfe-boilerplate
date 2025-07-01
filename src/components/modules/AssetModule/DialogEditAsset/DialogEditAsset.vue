<script setup lang="ts">
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
} from '@fewangsit/wangsvue';
import { OptionValue } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';
import { Nullable } from '@fewangsit/wangsvue/components/ts-helpers';
import { shallowRef } from 'vue';

const visible = defineModel<boolean>('visible', { default: false });

const groupsDropdownValue = shallowRef<OptionValue>();
const categoriesDropdownValue = shallowRef<OptionValue>();
const nameDropdownValue = shallowRef<OptionValue>();
const brandsDropdownValue = shallowRef<OptionValue>();
const modelsDropdownValue = shallowRef<OptionValue>();
const aliasNameInputTextValue = shallowRef<Nullable<string>>();
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
            v-model="groupsDropdownValue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="groups"
            label="Group"
            mandatory
            option-label="label"
            option-value="value"
          />
          <Dropdown
            v-model="categoriesDropdownValue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="categories"
            label="Category"
            mandatory
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="nameDropdownValue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="name"
            label="Name"
            mandatory
            option-label="label"
            option-value="value"
          />
          <InputText
            v-model="aliasNameInputTextValue"
            :mandatory="false"
            field-name="aliasName"
            label="Alias Name"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="brandsDropdownValue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="brands"
            label="Brand"
            mandatory
            option-label="label"
            option-value="value"
          />
          <Dropdown
            v-model="modelsDropdownValue"
            :options="[
              { label: 'null', value: null },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]"
            field-name="models"
            label="Model/Type"
            mandatory
            option-label="label"
            option-value="value"
          />
        </div>
      </div>
      <ImageCompressor confirm-on-delete label="Foto" mandatory multiple />
    </template>
  </DialogForm>
</template>
