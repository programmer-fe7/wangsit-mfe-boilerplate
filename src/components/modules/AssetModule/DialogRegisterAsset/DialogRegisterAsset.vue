<script setup lang="ts">
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
  useToast,
} from '@fewangsit/wangsvue';
import { OptionValue } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';
import { Nullable } from '@fewangsit/wangsvue/components/ts-helpers';
import { shallowRef } from 'vue';

const visible = defineModel<boolean>('visible', { default: false });

const registerToast = useToast();

const groupsDropdownValue = shallowRef<OptionValue>();
const categoriesDropdownValue = shallowRef<OptionValue>();
const nameDropdownValue = shallowRef<OptionValue>();
const brandsDropdownValue = shallowRef<OptionValue>();
const modelsDropdownValue = shallowRef<OptionValue>();
const aliasNameInputTextValue = shallowRef<Nullable<string>>();

const openToast = (message: string, error?: boolean): void => {
  registerToast.add({
    message,
    error,
  });
};
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :aside-right-width="600"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    @submit="openToast('Success, asset has been registered.')"
    header="Register Asset"
    severity="success"
    show-stay-checkbox
    width="medium"
  >
    <template #fields>
      <div class="grid grid-rows-3 gap-4">
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="groupsDropdownValue"
            :options="[
              { label: 'Room 402', value: 'Room 402' },
              { label: 'Warehouse', value: 'Warehouse' },
              { label: 'Garage', value: 'Garage' },
            ]"
            field-name="groups"
            label="Group"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <Dropdown
            v-model="categoriesDropdownValue"
            :options="[
              { label: 'Elektronik', value: 'Elektronik' },
              { label: 'Transportasi', value: 'Transportasi' },
              { label: 'Sanitasi', value: 'Sanitasi' },
            ]"
            field-name="categories"
            label="Category"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="nameDropdownValue"
            :options="[
              { label: 'Name 1', value: 'Name 1' },
              { label: 'Name 2', value: 'Name 2' },
              { label: 'Name 3', value: 'Name 3' },
            ]"
            field-name="name"
            label="Name"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <InputText
            v-model="aliasNameInputTextValue"
            :mandatory="false"
            :max-length="30"
            field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others.`"
            field-name="aliasName"
            label="Alias Name"
            use-validator
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="brandsDropdownValue"
            :options="[
              { label: 'Samsung', value: 'Samsung' },
              { label: 'Hyundai', value: 'Hyundai' },
              { label: 'Apple', value: 'Apple' },
            ]"
            field-name="brands"
            label="Brand"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <Dropdown
            v-model="modelsDropdownValue"
            :options="[
              { label: 'Macbook Pro', value: 'Macbook Pro' },
              { label: 'Asus', value: 'Asus' },
              { label: 'Ultra 24', value: 'Ultra 24' },
            ]"
            field-name="models"
            label="Model/Type"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
        </div>
      </div>
      <ImageCompressor
        :custom-requirements="['Max. 1 MB', 'Must be image format']"
        confirm-on-delete
        label="Foto"
        mandatory
        use-validator
        validator-message="File size is too big! Max. 1 MB"
      />
    </template>
  </DialogForm>

  <Toast />
</template>
