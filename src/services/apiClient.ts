// src/services/apiClient.ts
import axios from 'axios';

const LOL_VERSION = '15.23.1';

/**
 * Riot Dragon API 통신을 위한 Axios Singleton 인스턴스
 * - baseURL: API의 기본 URL을 설정하여 중복 코드 제거
 * - timeout: 요청이 5초 이상 걸릴 경우 자동으로 취소
 */
const apiClient = axios.create({
  baseURL: `https://ddragon.leagueoflegends.com/cdn/${LOL_VERSION}`,
  timeout: 5000,
});

/**
 * Axios 요청 인터셉터 (Request Interceptor)
 * - 향후 API Key나 인증 토큰이 필요할 경우 여기서 헤더를 추가할 수 있습니다.
 */
apiClient.interceptors.request.use(
  (config) => {
    // console.log('Starting API request:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Axios 응답 인터셉터 (Response Interceptor)
 * - 응답 데이터가 'data' 프로퍼티에 감싸여 오는 경우가 많으므로,
 *   성공적인 응답에 대해 자동으로 'data' 프로퍼티를 반환하도록 처리합니다.
 * - API 에러를 중앙에서 관리하고 로깅할 수 있습니다.
 */
apiClient.interceptors.response.use(
  (response) => {
    // 대부분의 Riot API 응답은 data 객체 내에 실제 컨텐츠가 있습니다.
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.message);
    // UI 단에서 에러를 쉽게 처리할 수 있도록 원래 에러를 그대로 반환합니다.
    return Promise.reject(error);
  }
);

export default apiClient;
