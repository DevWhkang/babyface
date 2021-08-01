const validateInfo = (values, mode) => {
  let errors = {};

  if (mode === 'sign-up') {
    if (!values.mobile) {
      errors.mobile = '연락처를 입력하세요. (ex) 010-1234-5678';
    } else if (!/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/.test(values.mobile)) {
      errors.mobile = "연락처에 '-'를 포함해 주세요.";
    } else {
      delete errors.mobile;
    }
  }

  if (!values.email) {
    errors.email = '이메일을 입력하세요.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = '이메일이 유효하지 않습니다.';
  } else {
    delete errors.email;
  }

  if (!values.password) {
    errors.password = '비밀번호를 입력하세요.';
  } else if (values.password.length < 8 || values.password.length > 15) {
    errors.password = '비밀번호는 8~15 자리입니다.';
  } else {
    delete errors.password;
  }

  if (!values.password) {
    errors['confirm-password'] = '비밀번호를 다시 한번 입력하세요.';
  } else if (values['confirm-password'] !== values.password) {
    errors['confirm-password'] = '비밀번호가 일치하지 않습니다.';
  } else {
    delete errors['confirm-password'];
  }

  return errors;
};

export default validateInfo;
