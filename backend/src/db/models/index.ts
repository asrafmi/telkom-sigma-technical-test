// Import semua model yang Anda punya
import User from './user.model';
import Event from './event.model';

// Fungsi untuk menetapkan relasi antara model-model
function associateModels() {
  User.associate({ Event });
  Event.associate({ User });
}

// Panggil fungsi untuk menetapkan relasi antara model-model
associateModels();

// Ekspor model-model yang telah Anda definisikan
export { User, Event };
