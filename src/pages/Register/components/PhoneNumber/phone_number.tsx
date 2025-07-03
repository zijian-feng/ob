import { APP_ID, APP_SECRET } from '@/constants';
import { getPhoneAreaCode } from '@/service/api/common';
import type { Options } from '@/types';
import i18n from '@/utils/i18n';
import { useRequest } from "ahooks";
import { Flex, Input, Select, Typography } from "antd";
import { useEffect, useState } from 'react';
import styles from './phone_number.module.scss';

const { Text } = Typography;


const { t } = i18n;
export default function PhoneNumber() {
  const [options, setOptions] = useState<Options>([]);
  const { data, loading } = useRequest(() => getPhoneAreaCode({
    app_id: APP_ID,
    app_secret: APP_SECRET,
  }));

  useEffect(() => {
    if (loading) return;
    if (data && data.length) {
      setOptions(data.map(({ phoneCode, zhCn }) => ({ label: zhCn, value: phoneCode })));
    }
  }, [loading])

  return (
    <Flex 
      gap={8}
      className={styles['phone_number']}
    >
      <Select
        defaultValue="+86"
        popupMatchSelectWidth={false}
      >
        {
          options.map(({ label, value }, index) => (
            <Select.Option key={index} value={value}>
              <Flex gap={4} align="center">
                <Text>{ value }</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>{ label }</Text>
              </Flex>
            </Select.Option>
          ))
        }
      </Select>
      <Input
        placeholder={t('register.company.phone')}
      />
    </Flex>
  )
}