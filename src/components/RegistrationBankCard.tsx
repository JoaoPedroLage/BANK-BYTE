import React, { useEffect, useContext, FormEvent } from 'react';
import AppContext from '../context/AppContext';
import { useRouter } from 'next/navigation';

interface BankData {
  slice(arg0: number): any;
  ispb: string;
  code: string;
  name: string;
  fullName: string;
};

export default function RegistrationBankCard() {
  const {
    selectedBank,
    setSelectedBank,
    bankAgency,
    setBankAgency,
    bankAccount,
    setBankAccount
  } = useContext(AppContext);

  const router = useRouter();


  function getSelectedBankData() {
    const accountData = (JSON.parse(localStorage.getItem('AccountData') || '{}') as BankData).slice(-1)[0];
    const { ispb, name, fullName, code } = accountData;

    setSelectedBank({ ispb, code, name, fullName });
  }

  function submitAccount(event: FormEvent) {
    event.preventDefault();

    const userAccountData = {
      bankName: selectedBank.fullName,
      bankCode: selectedBank.code,
      bankAgency: bankAgency,
      bankAccount: bankAccount
    };

    const userAccountsData = JSON.parse(localStorage.getItem('userAccounts') || '[]');

    if (userAccountsData) {
      const newArray = [...userAccountsData, userAccountData];

      localStorage.setItem('userAccounts', JSON.stringify(newArray))
    } else {
      localStorage.setItem('userAccounts', JSON.stringify([userAccountData]));

    }

    router.push('/sucess-registration')
  }

  useEffect(() => {
    getSelectedBankData();
  }, []);

  return (
    <>
      <form onSubmit={(e) => submitAccount(e)}>
        <span>ISPB do Banco: {selectedBank.ispb}</span>
        <br />
        <span>Código do Banco: {selectedBank.code}</span>
        <br />
        <span>Nome do Banco: {selectedBank.name}</span>
        <br />
        <span>Nome completo do Banco: {selectedBank.fullName}</span>
        <br />
        <input
          placeholder='Agência do banco'
          type='number'
          onChange={(event) => setBankAgency(event.target.value)}
        />
        <br />
        <input
          placeholder='Conta de cadastro'
          type='number'
          onChange={(event) => setBankAccount(event.target.value)}
        />
        <br />
          <button
            type='submit'
          >
            Cadastrar Conta
          </button>
      </form>
    </>
  );
}
