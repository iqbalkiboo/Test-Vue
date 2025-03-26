import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    table: {
      title: 'Table List',
      addData: 'Add Data',
      search: 'Search data...',
      columns: {
        no: 'No',
        name: 'Name',
        action: 'Action'
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete'
      },
      pagination: {
        previous: 'Previous',
        next: 'Next'
      }
    }
  },
  id: {
    table: {
      title: 'Daftar Tabel',
      addData: 'Tambah Data',
      search: 'Cari data...',
      columns: {
        no: 'No',
        name: 'Nama',
        action: 'Aksi'
      },
      actions: {
        edit: 'Ubah',
        delete: 'Hapus'
      },
      pagination: {
        previous: 'Sebelumnya',
        next: 'Selanjutnya'
      }
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})