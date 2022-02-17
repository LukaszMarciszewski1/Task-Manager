import React from 'react'
import styles from './styles.module.scss'

type ButtonProps = {
  id: string
  onClick: () => void
}

const TaskButton: React.FC<ButtonProps> = ({onClick, id}) => {

  const name = id === 'list' ? 'Dodaj listę zadań' : 'Dodaj nową kartę'
  return (
    <button className={styles.taskButton} onClick={onClick}>
      +
      {name}
    </button>
  )
}

export default TaskButton
