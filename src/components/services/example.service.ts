import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FetchResponse } from '@fewangsit/wangsvue/components/datatable/DataTable.vue';
import { FetchOptionResponse } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';
import { getBaseURL } from '@/utils/getBaseURL.util';
import { GetOptionsParams, GetUsersParams } from '../dto/user.dto';
import { Member } from '@/types/member.type';

type GetOptionsResponse = FetchOptionResponse<GetOptionsParams>;

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  const BASE_URL = getBaseURL('APP_WANGS_DUMMY_REST_API');

  const instance = axios.create({
    baseURL: `${BASE_URL}/user`,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
      ...headers,
    },
    params,
  });

  return instance;
};

const UserServices = {
  getUsers: (
    params: GetUsersParams,
  ): Promise<AxiosResponse<FetchResponse<Member>>> => {
    return API({ params }).get('/');
  },

  getOptions: (
    params: GetOptionsParams,
  ): Promise<AxiosResponse<GetOptionsResponse>> => {
    return API({ params }).get('/options');
  },
};

export default UserServices;
