import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();

  factory DatabaseHelper() => _instance;

  DatabaseHelper._internal();

  static Database? _database;

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await initDatabase();
    return _database!;
  }

  Future<Database> initDatabase() async {
    String path = await getDatabasesPath();
    path = join(path, 'pharmacy.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) {
        return db.execute('''
          CREATE TABLE pharmacy_order(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            address TEXT,
            phone TEXT,
            item TEXT,
            quantity INTEGER
          )
        ''');
      },
    );
  }

  Future<int> insertOrder(Map<String, dynamic> order) async {
    final db = await database;
    return await db.insert('pharmacy_order', order);
  }
  Future<List<Map<String, dynamic>>> getOrderById(int orderId) async {
    final db = await database;
    return await db.query(
      'pharmacy_order',
      where: 'id = ?',
      whereArgs: [orderId],
    );
  }
}


