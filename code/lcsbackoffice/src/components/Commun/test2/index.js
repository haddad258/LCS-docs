import React from 'react';
import DataTable from './DataTable'; // Assurez-vous d'ajuster le chemin selon votre structure de fichiers
import {Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs
  } from '@coreui/icons'

  const tableExample = [
    {
      avatar: { src: "avatar1", status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 15, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: "avatar2", status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Feb 1, 2024',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: "avatar3", status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 15, 2022' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: "avatar4", status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 10, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: "avatar5", status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 2, 2022',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: "avatar6", status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Sep 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  // Fonction utilitaire pour convertir la chaîne de date en objet Date
const parseDateString = (dateString) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const [month, day, year] = dateString.split(' ');
    const monthIndex = months.indexOf(month);
    
    // Le mois doit être de 0 à 11 dans l'objet Date
    return new Date(year, monthIndex, parseInt(day), 0, 0, 0);
  };
const tableColumns = [
  {
    title: (
          <UserOutlined style={{ marginRight: 8 }} />
      ),
    dataIndex: 'avatar',
    key: 'avatar',
    align: 'center', // Centrer le contenu de cette colonne
    render: (text, record) => <Avatar src={record.avatar.src} />,
  },
  {
    title: 'Nom',
    dataIndex: 'user.name',
    key: 'user.name',
    sorter: (a, b) => a.user.name.localeCompare(b.user.name),
    align: 'center', // Centrer le contenu de cette colonne
    render: (text, record) => <span>{record.user.name}</span>,
  },
  {
    title: 'Enregistré le',
    dataIndex: 'user.registered',
    key: 'user.registered',
    sorter: (a, b) => {
      const dateA = parseDateString(a.user.registered);
      const dateB = parseDateString(b.user.registered);
      return dateA - dateB;
    },
    align: 'center', // Centrer le contenu de cette colonne
    render: (text, record) => <span><div className="small text-body-secondary text-nowrap">Last login</div>{record.user.registered}</span>,
  },
  {
    title: 'Activité',
    dataIndex: 'activity',
    key: 'activity',
    align: 'center', // Centrer le contenu de cette colonne
    sorter: (a, b) => a.activity.localeCompare(b.activity),
    render: (text, record) => <span>{record.activity}</span>,
  }
];


const App = () => {
  return (
    <div>
      <h1>Table Example</h1>
      <DataTable columns={tableColumns} dataSource={tableExample} />
    </div>
  );
};

export default App;