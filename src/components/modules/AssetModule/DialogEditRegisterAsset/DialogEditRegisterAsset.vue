<script setup lang="ts">
import { Asset } from '@/types/asset.type';
import {
  DialogForm,
  Dropdown,
  ImageCompressor,
  InputText,
  useToast,
} from '@fewangsit/wangsvue';
import { DialogFormPayload } from '@fewangsit/wangsvue/components/dialogform/DialogForm.vue';
import { FormValue } from '@fewangsit/wangsvue/components/form/Form.vue';
import { computed, shallowRef } from 'vue';

const props = defineProps<{
  selectedAsset: Asset | undefined;
}>();

const visible = defineModel<boolean>('visible', { default: false });

const toast = useToast();

const hasNameValue = shallowRef<boolean>(true);
const hasBrandValue = shallowRef<boolean>(true);
const groupDropdownValue = shallowRef<FormValue>('');
const stayOnDialog = shallowRef<boolean>(false);

const mode = computed<string>(() => {
  return props.selectedAsset ? 'Edit' : 'Register';
});
const resetDropdownDisabled = (): void => {
  hasNameValue.value = true;
  hasBrandValue.value = true;
};

const submitForm = (payload: DialogFormPayload): void => {
  const { stayAfterSubmit, formValues } = payload;

  stayOnDialog.value = stayAfterSubmit;
  groupDropdownValue.value = formValues.groups;

  resetDropdownDisabled();
  toast.add({
    message: 'Success, asset has been ' + mode.value.toLowerCase() + 'ed.',
  });
};
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :aside-right-width="600"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    :header="mode + ' Asset'"
    :show-stay-checkbox="mode === 'Register'"
    @clear="resetDropdownDisabled()"
    @close="resetDropdownDisabled()"
    @show="console.log(selectedAsset)"
    @submit="submitForm"
    severity="success"
    width="medium"
  >
    <template #fields>
      <div class="grid grid-rows-3 gap-4">
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            :initial-value="
              stayOnDialog ? groupDropdownValue : props.selectedAsset?.group
            "
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
            :initial-value="props.selectedAsset?.category"
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
            :initial-value="props.selectedAsset?.name"
            :options="[
              { label: 'Name 1', value: 'Name 1' },
              { label: 'Name 2', value: 'Name 2' },
              { label: 'Name 3', value: 'Name 3' },
            ]"
            @update:model-value="hasNameValue = !hasNameValue"
            field-name="name"
            label="Name"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <InputText
            :value="props.selectedAsset?.aliasName"
            field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others.`"
            field-name="aliasName"
            label="Alias Name"
            use-validator
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Dropdown
            :disabled="mode === 'Register' ? hasNameValue : false"
            :initial-value="props.selectedAsset?.brand"
            :options="[
              { label: 'Samsung', value: 'Samsung' },
              { label: 'Hyundai', value: 'Hyundai' },
              { label: 'Apple', value: 'Apple' },
              { label: 'Futura', value: 'Futura' },
              { label: 'LG', value: 'LG' },
              { label: 'JBL', value: 'JBL' },
            ]"
            @update:model-value="hasBrandValue = !hasBrandValue"
            field-name="brands"
            label="Brand"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <Dropdown
            :disabled="mode === 'Register' ? hasBrandValue : false"
            :initial-value="props.selectedAsset?.model"
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
        :image-preview-url="selectedAsset?.assetImage"
        confirm-on-delete
        label="Foto"
        mandatory
        use-validator
        validator-message="File size is too big! Max. 1 MB"
      />
    </template>
  </DialogForm>
</template>
