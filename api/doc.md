
# API Documentation

## **Routes**
| Method | Endpoint          | Description                                      |
|--------|-------------------|--------------------------------------------------|
| GET    | `/players`        | Retrieves all players.                          |
| GET    | `/players/:id`    | Retrieves a specific player by ID.              |
| POST   | `/players`        | Creates a new player.                           |
| PUT    | `/players/:id`    | Updates a player's information (full update).   |
| PATCH  | `/players/:id`    | Updates specific fields of a player (partial).  |
| DELETE | `/players/:id`    | Deletes a specific player by ID.                |

---

## **Params** (Query Operators)
You can use the following query operators to filter or compare fields:

| Operator | Symbol         | Meaning                  |
|----------|----------------|--------------------------|
| `==`     | `=`            | Equal to                |
| `lt`     | `<`            | Less than               |
| `lte`    | `<=`           | Less than or equal to   |
| `gt`     | `>`            | Greater than            |
| `gte`    | `>=`           | Greater than or equal to|
| `ne`     | `!=`           | Not equal               |

### **Example: Filtering with a Range**
To filter players based on a range of ratings, use the query parameters with operators:

#### **Query**
```http
GET /players?rating[gte]=85&rating[lte]=90
```

#### **Explanation**
This query retrieves players with a rating between 85 and 90 (inclusive).

#### **Combined Example**
```http
GET /players?rating[gt]=80&rating[lte]=95&age[lt]=30
```
This retrieves players with:
- `rating > 80`
- `rating <= 95`
- `age < 30`

---

## **Sorting**
The `_sort` parameter allows you to sort the results by one or more fields.

| Syntax            | Description                                      |
|-------------------|--------------------------------------------------|
| `_sort=f1,f2`     | Sorts by `f1` (ascending) and `f2` (ascending).  |
| `_sort=-f1,f2`    | Sorts by `f1` (descending) and `f2` (ascending). |

### **Example: Sorting Players**
#### **Query**
```http
GET /players?_sort=rating,-views
```

#### **Explanation**
This query sorts players by:
1. `rating` in ascending order.
2. `views` in descending order.

---

## **Delete**
You can delete resources with dependencies using an additional query parameter.

| Endpoint                 | Description                           |
|--------------------------|---------------------------------------|
| DELETE `/players/:id`      | Deletes the player with the given ID.  |
| DELETE `/players/:id?_dependent=stats` | Deletes the player and their associated stats. |

### **Example: Delete with Dependencies**
#### **Query**
```http
DELETE /players/1?_dependent=stats
```

#### **Explanation**
This deletes the player with ID `1` and ensures all associated stats are also deleted.



---
