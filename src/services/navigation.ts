import {createRef} from 'react';

const navigationRef: any = createRef();
const navigate = (name: string, params?: any) => {
  navigationRef.current?.navigate(name, params);
};

const push = (name: string) => {
  navigationRef.current?.push(name);
};

const goBack = () => {
  navigationRef.current?.goBack();
};

export {push, navigate, goBack, navigationRef};
