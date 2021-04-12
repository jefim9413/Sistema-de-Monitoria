import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css'
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function MonitorForm() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);


  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const newArray = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }
      return scheduleItem;
    });
    setScheduleItems(newArray);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    api.post('/classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!')
    });

    /*
    console.log({
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      scheduleItems
    });
    */
  }

  return (
    <>
      <div id="page-teacher-form" className="container">
        <PageHeader
          title="Que incrivel que você quer dar aulas."
          description="O primeiro passo é preencher esse formulário de inscrição"
        />

        <main>
          <form onSubmit={handleCreateClass}>
            <fieldset>
              <legend>Seus dados</legend>
              <Input
                label="Nome Completo"
                name="name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
              <Input
                label="Link da sua foto(comece com //http)"
                name="avatar"
                value={avatar}
                onChange={(e) => { setAvatar(e.target.value) }}
              />
              <Input
                label="Whatsapp (somente números)"
                name="whatsapp"
                value={whatsapp}
                onChange={(e) => { setWhatsapp(e.target.value) }}
              />
              <Textarea
                name="bio"
                label="Biografia"
                value={bio}
                onChange={(e) => { setBio(e.target.value) }}
              />
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>
              <Select
                label="Matéria"
                name="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value)
                }}
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Ciencias', label: 'Ciências' },
                  { value: 'Geografia', label: 'Geografia' }
                ]}
              />
              <Input
                label="Custo da sua hora por aula (em R$)"
                name="cost"
                value={cost}
                onChange={(e) => { setCost(e.target.value) }}
              />
            </fieldset>

            <fieldset>
              <legend>
                Horários disponíveis
                <button type="submit" onClick={addNewScheduleItem}>
                  + Novo horário
                </button>
              </legend>

              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.week_day} className="schedule-item">
                    <Select
                      name="week_day"
                      label="Dia da semana"
                      value={scheduleItem.week_day}
                      onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' }
                      ]}
                    />
                    <Input
                      label="Das"
                      name="from"
                      type="time"
                      value={scheduleItem.from}
                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                    />
                    <Input
                      label="Até"
                      name="to"
                      type="time"
                      value={scheduleItem.to}
                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                    />
                  </div>
                );
              })}
            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="aviso importante" />
                Importante! <br />
                Preencha todos os dados
              </p>
              <button type="submit">
                Salvar cadastro
              </button>
            </footer>
          </form>
        </main>
      </div>
    </>
  );
}

export default MonitorForm;