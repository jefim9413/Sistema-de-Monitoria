import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';

import './styles.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function MonitorList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();



    const response = await api.get('/classes', {
      params: {
        subject,
        weekday: week_day,
        time
      }
    });


    console.log(response);



    setTeachers(response.data);
  }

  return (
    <>
      <div id="page-teacher-list" className="container">

        <PageHeader title="Estes são os monitores disponíveis.">
          <form id="search-teachers" onSubmit={searchTeachers}>
            <Select
              label="Matéria"
              name="subject"
              value={subject}
              onChange={e => { setSubject(e.target.value) }}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Ciencias', label: 'Ciências' },
                { value: 'Geografia', label: 'Geografia' }
              ]}
            />
            <Select
              label="Dia da semana"
              name="week_day"
              value={week_day}
              onChange={e => { setWeek_day(e.target.value) }}
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
              label="Hora"
              name="time"
              type="time"
              value={time}
              onChange={e => { setTime(e.target.value) }}
            />
            <button type="submit">
              Buscar
            </button>
          </form>
        </PageHeader>

        <main>
          {teachers.length > 0 ?
            teachers.map((teacher: Teacher) => {
              return <TeacherItem key={teacher.id} teacher={teacher} />;
            })
            :
            <div className="no-found">
              <p>
                Nenhum professor encontrado
                com sua pesquisa.
              </p>
            </div>
          }
        </main>
      </div>
    </>
  );
}

export default MonitorList;