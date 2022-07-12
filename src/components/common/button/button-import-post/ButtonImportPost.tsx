import React, { FC } from 'react';
import ButtonComponent from '../button-component/ButtonComponent';
import { useTranslation } from 'react-i18next';
import { ButtonComponentProps } from 'src/models/common/button';
import { useRouter } from 'next/router';

const ButtonImportPost: FC<ButtonComponentProps> = ({
  onClick,
  disabled,
  ...props
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const importPost = () => {
    onClick && onClick();
    // router.push('/posts/import');
  };

  return (
    <ButtonComponent
      variant={'contained'}
      onClick={importPost}
      disabled={disabled}
      {...props}
    >
      {t('buttons.importPost')}
    </ButtonComponent>
  );
};

export default ButtonImportPost;
