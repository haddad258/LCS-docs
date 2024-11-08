import React, { useState, useEffect } from 'react';
import { Table, Input, Space } from 'antd';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const { Search } = Input;
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const ForTest = ({ data, columns }) => {
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [buttonText, setButtonText] = useState(!selectedRowKeys ? i18n.t('showSelectRowsText') : i18n.t('hideSelectRowsText')); // Initialiser le texte du bouton

  useEffect(() => {
    // Mettre à jour filteredData avec les données initiales uniquement si data n'est pas vide
    if (data && data.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  const handleSearch = (text) => {
    const filteredDataSource = data.filter((item) =>
      columns.some((col) =>
        String(item[col.index]).toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredData(filteredDataSource);
  };

  const handleButtonClick = () => {
    setselectedRowKeys(!selectedRowKeys); // Inverser l'état de selectedRowKeys
    setButtonText(!selectedRowKeys ? i18n.t('hideSelectRowsText') : i18n.t('showSelectRowsText')); // Changer le texte du bouton en fonction de selectedRowKeys
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  // Fonction de tri personnalisée pour la colonne 'name'
  const compareColumns = (a, b, dataIndex) => {
    if (dataIndex !== 'actions') {
      return String(a[dataIndex]).localeCompare(String(b[dataIndex]));
    }
    return 0; // Retourne 0 pour conserver l'ordre d'origine si c'est la colonne 'actions'
  };

  const columnsTitles = columns.map(col => ({
    title: col.label,
    dataIndex: col.index,
    key: col.key,
    render: col.render,
    sorter: (a, b) => compareColumns(a, b, col.index), // Utilisez la fonction de tri personnalisée pour la colonne 'name'
    align: col.field === 'actions' ? 'center' : null, // Ajoutez l'option align: 'center' si le champ est 'actions'
  }));

  // const customExpandIcon = () => {
  //   return (
  //     <p>exmp</p>
  //   );
  // };

  return (
    <>
      <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <button className="btn btn-info text-white" onClick={handleButtonClick}>{buttonText}</button>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Search
            placeholder={i18n.t('searchPlaceholder')}
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
        </div>
      </Space>
      <Table
        rowSelection={selectedRowKeys ? rowSelection : null}
        columns={columnsTitles}
        dataSource={filteredData}
        onChange={onChange}
        size="small"
        bordered
        expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}sss enw ecampal</p>}
        //expandIcon={(props) => customExpandIcon(props)}
        // title={() => 'Header'}
        // footer={() => 'Footer'}
        scroll={{ x: 'calc(600px + 50%)', y: 700 }}
        pagination={{
          pageSize: 5, // Nombre d'éléments par page
          hideOnSinglePage: true, // Masquer la pagination si une seule page
        }}
      />
    </>
  );
};

ForTest.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object),
};

export default ForTest;