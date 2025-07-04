<script setup lang="ts">
import {
  DialogForm,
  Dropdown,
  eventBus,
  ImageCompressor,
  InputText,
  useToast,
} from '@fewangsit/wangsvue';

import {
  RegEditAssetBody,
  UpdateAssetParams,
} from '@/components/dto/assetService.dto';

import { Option } from '@fewangsit/wangsvue/components/dropdown/Dropdown.vue';
import { DialogFormPayload } from '@fewangsit/wangsvue/components/dialogform/DialogForm.vue';
import { FormValue } from '@fewangsit/wangsvue/components/form/Form.vue';
import { QueryParams } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';
import { computed, onMounted, shallowRef } from 'vue';
import { Asset, AssetOption } from '@/types/asset.type';

import AssetServices from '@/components/services/asset.service';

const props = defineProps<{
  selectedAsset: Asset | undefined;
}>();

const isVisible = defineModel<boolean>('visible', { default: false });

onMounted(() => {
  getDropdownOptions();
});

const toast = useToast();

const hasNameValue = shallowRef<boolean>(true);
const hasBrandValue = shallowRef<boolean>(true);
const canStayOnDialog = shallowRef<boolean>(false);
/*
 * FIXME: The initial value shouldn't be an empty string, just put nothing in the parentheses.
 * That will cause the ref's initial value to be undefined.
 * But as you'll see in another comment down below, this ref should actually be deleted.
 */
const groupDropdownValue = shallowRef<FormValue>('');
const dropdownOptions = shallowRef<AssetOption>({
  nameOptions: [],
  groupOptions: [],
  brandOptions: [],
  modelOptions: [],
  categoryOptions: [],
});

const mode = computed<string>(() => {
  return props.selectedAsset ? 'Edit' : 'Register';
});

// FIXME: Delete this function, you'll see why down below
const resetDropdownDisabled = (): void => {
  hasNameValue.value = true;
  hasBrandValue.value = true;
};

/*
 * FIXME: The two functions below are too simple, you should just include them in the parent function.
 * And a reminder, all API functions should be wrapped in try-
 */
const registerNewAsset = async (body: RegEditAssetBody): Promise<void> => {
  await AssetServices.postRegisterAsset(body);
};

const updateExistingAsset = async (
  params: UpdateAssetParams,
  body: RegEditAssetBody,
): Promise<void> => {
  await AssetServices.putEditAsset(params, body);
};

const getAssetOptions = async (params: QueryParams): Promise<Option[]> => {
  try {
    const { data } = await AssetServices.getAssetOptions(params);

    // Get the key that has the value true, example { groupOptions: true }
    const key = Object.keys(params).find((k) => params[k]);

    return data.data[key as keyof AssetOption];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getDropdownOptions = async (): Promise<void> => {
  dropdownOptions.value = {
    nameOptions: await getAssetOptions({ nameOptions: true }),
    groupOptions: await getAssetOptions({ groupOptions: true }),
    brandOptions: await getAssetOptions({ brandOptions: true }),
    modelOptions: await getAssetOptions({ modelOptions: true }),
    categoryOptions: await getAssetOptions({ categoryOptions: true }),
  };
};

const submitForm = (payload: DialogFormPayload): void => {
  const { stayAfterSubmit, formValues } = payload;

  canStayOnDialog.value = stayAfterSubmit;
  groupDropdownValue.value = formValues.group;

  /*
   * FIXME: The formValues don't need to be converted to string, and they don't need
   * to be put into a new object. You can just pass the formValues directly to the API,
   * and add type casting: registerNewAsset(formValues as RegEditAssetBody)
   *
   * I assume you tried to convert them to string because it still has the DialogFormValue
   * type? If so, should've used type casting instead Let's say `const value` has
   * the type DialogFormValue, you can do `const newValue: string = value as string`.
   */
  const assetBody: RegEditAssetBody = {
    name: formValues.name.toString(),
    group: formValues.group.toString(),
    brand: formValues.brand.toString(),
    model: formValues.model.toString(),
    category: formValues.category.toString(),
    aliasName: formValues.aliasName.toString(),
    assetImage: formValues.assetImage.toString(),
  };

  try {
    if (mode.value === 'Register') {
      registerNewAsset(assetBody);
    } else {
      const params: UpdateAssetParams = {
        _id: props.selectedAsset?._id ?? '',
      };
      updateExistingAsset(params, assetBody);
    }

    resetDropdownDisabled();
    eventBus.emit('data-table:update', { tableName: 'asset-list' });
    toast.add({
      message: 'Success, asset has been ' + mode.value.toLowerCase() + 'ed.',
      severity: 'success',
    });
  } catch (error) {
    console.error(error);
    toast.add({
      message: 'Failed to ' + mode.value.toLowerCase() + ' asset.',
      severity: 'error',
    });
  }
};
</script>

<template>
  <!--
    FIXME: This form will close after you click submit, whether the API succeeds or fails.
    Use DialogForm's closeOnSubmit prop to prevent this.
  -->
  <DialogForm
    v-model:visible="isVisible"
    :aside-right-width="600"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    :header="mode + ' Asset'"
    :show-stay-checkbox="mode === 'Register'"
    @clear="resetDropdownDisabled"
    @close="resetDropdownDisabled"
    @submit="submitForm"
    severity="success"
    width="medium"
  >
    <template #fields>
      <div class="grid grid-rows-3 gap-4">
        <div class="grid grid-cols-2 gap-4">
          <!--
            FIXME: I think you made groupDropdownValue with the purpose of
            not resetting the form after submitting it? If so, there's already
            a prop for it in DialogForm, called resetAfterSubmit. So you can
            just delete groupDropdownValue and canStayOnDialog.
          -->
          <Dropdown
            :initial-value="
              canStayOnDialog ? groupDropdownValue : props.selectedAsset?.group
            "
            :options="dropdownOptions.groupOptions"
            field-name="group"
            label="Group"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <Dropdown
            :initial-value="props.selectedAsset?.category"
            :options="dropdownOptions.categoryOptions"
            field-name="category"
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
            :options="dropdownOptions.nameOptions"
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
          <!--
            FIXME: This update:model-value won't work. Let's say the user chooses a brand,
            then they choose another brand, hasBrandValue will be false again.
            Don't use the update:model-value event, just use v-model instead.
            Delete hasNameValue and hasBrandValue.
          -->
          <Dropdown
            :disabled="mode === 'Register' ? hasNameValue : false"
            :initial-value="props.selectedAsset?.brand"
            :options="dropdownOptions.brandOptions"
            @update:model-value="hasBrandValue = !hasBrandValue"
            field-name="brand"
            label="Brand"
            mandatory
            option-label="label"
            option-value="value"
            use-validator
          />
          <Dropdown
            :disabled="mode === 'Register' ? hasBrandValue : false"
            :initial-value="props.selectedAsset?.model"
            :options="dropdownOptions.modelOptions"
            field-name="model"
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
        field-name="assetImage"
        label="Foto"
        mandatory
        use-validator
        validator-message="File size is too big! Max. 1 MB"
      />
    </template>
  </DialogForm>
</template>
