import request from '@/utils/request'

export function getFileList(fileDate, fileType) {
  const data = {
    fileDate,
    fileType
  }
  return request({
    url: '/file/getFileList',
    method: 'post',
    data: data
  });
}


export function downloadFile(fileName, fileType) {
  const data = {
    fileName,
    fileType
  }
  return request({
    url: '/file/downloadFile',
    method: 'post',
    data: data
  });
}

export function uploadFile(formData) {

  return request.post( '/file/uploadFile', formData,
  {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
  });
}
