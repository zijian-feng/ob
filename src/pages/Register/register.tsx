import logo from '@/assets/images/kpay-logo.png';
import { Langs } from '@/constants';
import i18n from '@/utils/i18n';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Form, Image, Input, Space, Typography } from 'antd';
import { withNamespaces } from 'react-i18next';
import PhoneNumber from './components/PhoneNumber/phone_number';
import styles from './register.module.scss';
import Checkbox from '@/components/Checkbox';

const { Title, Link } = Typography;
const { t } = i18n;


function Register() {
  const handleFinish = (values: unknown) => {
    console.log('finish', values);
  }
  return (
    <Flex
      id="register"
      className="page"
      justify="flex-end"
    >
      <div className={styles['register-layout']}>
        <div className={styles['logo']}>
          <Image
            src={logo}
            width={120}
            preview={false}
          />
        </div>
        <Checkbox
          label="测试复选框的能力"
          value="test"
        />
      </div>
      <Flex
        align="center"
        justify="center"
        className={styles['register-form']}
      >
        <Form
          colon={false}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Title level={3} style={{ margin: '0 0 24px' }}>{t('register.title')}</Title>
          <Form.Item
            label={t('register.company.phone')}
          >
            <PhoneNumber
            />
          </Form.Item>
          <Form.Item
            label={t('register.company.email') + t('register.company.email.tip')}
          >
            <Input
              placeholder={t('register.company.email')}
            />
          </Form.Item>
          <Form.Item
            label={t('register.passwd')}
          >
            <Input.Password
              placeholder={t('register.passwd')}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '20px' }}
          >
            {/* <Checkbox>
              <Flex align="center" gap={4}>
                <span>{t('register.agreement')}</span>
                <Link>
                  《用戶協議》
                </Link>
                <span>和</span>
                <Link>
                  《隱私政策》
                </Link>
              </Flex>
            </Checkbox> */}
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
            >
              {t('register.submit')}
            </Button>
          </Form.Item>
          <Form.Item>
            <Flex justify="center" align="center">
              <span>{t('register.haveAccount')}</span>
              <Link>
                {t('register.tologin')}
              </Link>
            </Flex>
          </Form.Item>
        </Form>
        <div className={styles['lang']}>
          <Dropdown
            trigger={['click']}
            menu={{
              defaultValue: i18n.language,
              items: Langs.map(({ label, value }) => ({
                label,
                key: value,
              })),
              onClick: (item) => {
                i18n.changeLanguage(item.key);
              }
            }}
          >
            <Link>
              <Space>
                <span>{Langs.find(({ value }) => value === i18n.language)?.label}</span>
                <DownOutlined />
              </Space>
            </Link>
          </Dropdown>
        </div>
        <Link className={styles['to-kpay']}>
          <Flex gap={8}>
            <span>{t('register.toKPay')}</span>
            <RightOutlined />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  )
}

export default withNamespaces()(Register)