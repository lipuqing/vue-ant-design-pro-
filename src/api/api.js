import $http from '@/utils/myrequest'

export function entry(parameter, name) {
  return $http({
    url: `/api/Entry?name=${name}`,
    method: 'post',
    data: parameter
  })
}