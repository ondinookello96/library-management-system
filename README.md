# Library Management System - Data Layer

A robust data layer for a library catalog system built using NestJS, Prisma ORM, and PostgreSQL.

## Project Structure

- `api/prisma/schema.prisma` - Data models (`User`, `Role`, `Genre`, `Book`, `Review`) and relational schema.
- `api/prisma/seed.ts` - Database seeder script populating genres and books.
- `api/src/prisma/prisma.service.ts` - NestJS service wrapping the PrismaClient lifecycle.
- `api/.env.example` - Example environment variables configuration.

---

## Schema Decisions

### Why Reference `Genre` Rather Than Embed It?

In this relational design, `Book` references `Genre` via a foreign key (`genreId`) with a relation constraint rather than embedding category details inside the book record. The key architectural motivations include:

1. **Normalization & Single Source of Truth**:
   - Genres possess their own metadata (such as standardized names and descriptions). Maintaining a dedicated `Genre` table eliminates redundant text across thousands of catalog items.
   - Renaming or updating a genre description happens in one row, preventing inconsistent or drifting taxonomy states across books.

2. **Data Integrity & Relational Constraints**:
   - Foreign key constraints enforce referential integrity at the database engine level, preventing orphaned books or typos in genre categorization.
   - Cascade rules and index lookups allow clean maintenance of category hierarchies and relationships.

3. **Query Performance & Aggregations**:
   - Distinct genre tables allow efficient filtering, indexing, and aggregations (such as counting books per genre or querying active categories) without performing full-table scans over book records.

---

## Prisma vs. Document Databases (e.g., MongoDB)

- **Declarative Schema vs. Schema-on-Read**: In a document database like MongoDB, documents in the same collection can have divergent shapes, leaving schema enforcement to application-level libraries (like Mongoose). Prisma models enforce strict, compile-time type safety and database-level invariants.
- **Explicit Foreign Key Relations**: While document databases encourage embedding child records (e.g., embedding genres or reviews directly inside a book document), Prisma maps relational joins (`@relation`) to foreign keys, providing predictable ACID transactions and normalized indexing.
