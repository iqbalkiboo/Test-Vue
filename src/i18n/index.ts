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
    },
    detail: {
      title: 'Berry Detail',
      id: 'ID',
      attributes: {
        size: 'Size',
        firmness: 'Firmness',
        growthTime: 'Growth Time',
        maxHarvest: 'Max Harvest',
        smoothness: 'Smoothness',
        soilDryness: 'Soil Dryness',
        naturalGiftPower: 'Natural Gift Power',
        naturalGiftType: 'Natural Gift Type',
        item: 'Item'
      },
      flavors: {
        title: 'Flavors',
        potency: 'Potency',
        detail: 'Flavor Detail',
        name: 'Name',
        contestType: 'Contest type'
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
    },
    detail: {
      title: 'Detail Berry',
      id: 'ID',
      attributes: {
        size: 'Ukuran',
        firmness: 'Kekerasan',
        growthTime: 'Waktu Tumbuh',
        maxHarvest: 'Panen Maksimal',
        smoothness: 'Kehalusan',
        soilDryness: 'Kekeringan Tanah',
        naturalGiftPower: 'Kekuatan Gift Alami',
        naturalGiftType: 'Tipe Gift Alami',
        item: 'Item'
      },
      flavors: {
        title: 'Rasa',
        potency: 'Potensi',
        detail: 'Detail Rasa',
        name: 'Nama',
        contestType: 'Tipe Kontes'
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