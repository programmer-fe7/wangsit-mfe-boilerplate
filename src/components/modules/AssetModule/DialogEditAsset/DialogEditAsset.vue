<script setup lang="ts">
import { Asset } from '@/types/asset.type';
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
  useToast,
} from '@fewangsit/wangsvue';
import { OptionValue } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';
import { shallowRef } from 'vue';

const props = defineProps<{
  selectedAsset: Asset | undefined;
}>();

const visible = defineModel<boolean>('visible', { default: false });

// FIXME: The toast constant should be named 'toast', so it's used as such: 'toast.add(...)'
const editToast = useToast();

const groupsDropdownValue = shallowRef<OptionValue>();
const categoriesDropdownValue = shallowRef<OptionValue>();
const nameDropdownValue = shallowRef<OptionValue>();
const brandsDropdownValue = shallowRef<OptionValue>();
const modelsDropdownValue = shallowRef<OptionValue>();
const aliasNameInputTextValue = shallowRef<string>();

// FIXME: You shouldn't make a new function, just use 'toast.add' every time a toast should be shown
const openToast = (message: string, error?: boolean): void => {
  editToast.add({
    message,
    error,
  });
};

const showForm = (): void => {
  groupsDropdownValue.value = props.selectedAsset?.group;
  categoriesDropdownValue.value = props.selectedAsset?.category;
  nameDropdownValue.value = props.selectedAsset?.name;
  brandsDropdownValue.value = props.selectedAsset?.brand;
  modelsDropdownValue.value = props.selectedAsset?.model;
  aliasNameInputTextValue.value = props.selectedAsset?.aliasName;
};
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :aside-right-width="600"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    @show="showForm"
    @submit="openToast('Success, asset has been edited.')"
    header="Edit Asset"
    severity="success"
    width="medium"
  >
    <template #fields>
      <div class="grid grid-rows-3 gap-4">
        <div class="grid grid-cols-2 gap-4">
          <!--
            FIXME: Rather than groupsDropdownValue being the initial value,
            it should be props.selectedAsset?.group instead, the same applies
            to all of the other dropdowns.

            Additionally, you should remove all of the shallowRefs
            (groupsDropdownValue, etc) and v-models. If you notice, they're all
            only used to initialize the form, and nothing else. This can already
            be done with the prop, no need for any variables.

            v-models are mostly used when there's something that needs to be
            shown conditionally. For example, when a form section should only
            be shown when the user has selected a certain option from the
            dropdown.
          -->
          <Dropdown
            v-model="groupsDropdownValue"
            :initial-value="groupsDropdownValue"
            :options="[
              { label: 'Room 402', value: 'Room 402' },
              { label: 'Warehouse', value: 'Warehouse' },
              { label: 'Garage', value: 'Garage' },
              { label: 'Room 301', value: 'Room 301' },
              { label: 'Meeting Room', value: 'Meeting Room' },
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
            :initial-value="categoriesDropdownValue"
            :options="[
              { label: 'Elektronik', value: 'Elektronik' },
              { label: 'Transportasi', value: 'Transportasi' },
              { label: 'Sanitasi', value: 'Sanitasi' },
              { label: 'Furniture', value: 'Furniture' },
              { label: 'AC', value: 'AC' },
              { label: 'Audio', value: 'Audio' },
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
            :initial-value="nameDropdownValue"
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
          <!--
            FIXME: The default max length is already 30 chars, so no need to
            specify it again. mandatory="false" is also not needed
          -->
          <InputText
            v-model="aliasNameInputTextValue"
            :mandatory="false"
            :max-length="30"
            :value="aliasNameInputTextValue"
            field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others.`"
            field-name="aliasName"
            label="Alias Name"
            use-validator
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            v-model="brandsDropdownValue"
            :initial-value="brandsDropdownValue"
            :options="[
              { label: 'Samsung', value: 'Samsung' },
              { label: 'Hyundai', value: 'Hyundai' },
              { label: 'Apple', value: 'Apple' },
              { label: 'Futura', value: 'Futura' },
              { label: 'LG', value: 'LG' },
              { label: 'JBL', value: 'JBL' },
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
            :initial-value="modelsDropdownValue"
            :options="[
              { label: 'Macbook Pro', value: 'Macbook Pro' },
              { label: 'Asus', value: 'Asus' },
              { label: 'Ultra 24', value: 'Ultra 24' },
              { label: '4627', value: '4627' },
              { label: 'Hercules', value: 'Hercules' },
              { label: 'JBL', value: 'JBL' },
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
</template>
