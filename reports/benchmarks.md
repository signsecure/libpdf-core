# Benchmark Report

> Generated on 2026-11-02 at 15:12:53 UTC
>
> System: linux | AMD EPYC 7763 64-Core Processor (4 cores) | 16GB RAM | Bun 1.4.4

---

## Contents

- [Comparison](#comparison)
- [Copying](#copying)
- [Drawing](#drawing)
- [Forms](#forms)
- [Loading](#loading)
- [Saving](#saving)
- [Splitting](#splitting)

## Comparison

### Load PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    52.1 |  19.20ms |  23.59ms | ±2.90% |      27 |
| @cantoo/pdf-lib |     4.5 | 224.54ms | 228.76ms | ±0.90% |      10 |
| pdf-lib         |     4.3 | 230.39ms | 253.48ms | ±2.76% |      10 |

- **libpdf** is 11.70x faster than @cantoo/pdf-lib
- **libpdf** is 12.00x faster than pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   10.0K | 100us |  201us | ±3.68% |   4,976 |
| pdf-lib         |    2.4K | 415us | 1.81ms | ±4.81% |   1,205 |
| @cantoo/pdf-lib |    2.4K | 416us | 1.85ms | ±3.41% |   1,202 |

- **libpdf** is 4.13x faster than pdf-lib
- **libpdf** is 4.14x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    7.8K | 128us |  252us | ±1.42% |   3,900 |
| @cantoo/pdf-lib |    2.3K | 444us | 2.48ms | ±4.33% |   1,127 |
| pdf-lib         |    2.1K | 482us | 2.11ms | ±4.58% |   1,038 |

- **libpdf** is 3.46x faster than @cantoo/pdf-lib
- **libpdf** is 3.76x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.7K |  369us | 1.00ms | ±1.66% |   1,354 |
| pdf-lib         |   688.5 | 1.45ms | 6.24ms | ±7.22% |     346 |
| @cantoo/pdf-lib |   563.8 | 1.77ms | 6.67ms | ±6.91% |     282 |

- **libpdf** is 3.93x faster than pdf-lib
- **libpdf** is 4.80x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    51.8 |  19.29ms |  28.21ms | ±4.11% |      26 |
| pdf-lib         |     3.1 | 325.12ms | 340.78ms | ±1.95% |      10 |
| @cantoo/pdf-lib |     1.8 | 571.13ms | 638.99ms | ±3.09% |      10 |

- **libpdf** is 16.86x faster than pdf-lib
- **libpdf** is 29.61x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.1 | 320.57ms | 330.11ms | ±1.07% |      10 |
| libpdf          |     2.8 | 354.38ms | 364.42ms | ±1.43% |      10 |
| @cantoo/pdf-lib |     1.7 | 598.43ms | 628.23ms | ±2.72% |      10 |

- **pdf-lib** is 1.11x faster than libpdf
- **pdf-lib** is 1.87x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   264.9 | 3.78ms |  4.57ms | ±1.05% |     133 |
| pdf-lib         |   107.9 | 9.26ms | 16.48ms | ±4.02% |      55 |
| @cantoo/pdf-lib |   101.7 | 9.84ms | 14.79ms | ±3.10% |      51 |

- **libpdf** is 2.45x faster than pdf-lib
- **libpdf** is 2.61x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    24.5 | 40.79ms | 44.82ms | ±2.10% |      13 |
| pdf-lib         |    13.8 | 72.25ms | 81.05ms | ±5.31% |       8 |
| @cantoo/pdf-lib |    12.8 | 78.05ms | 85.42ms | ±4.79% |       7 |

- **libpdf** is 1.77x faster than pdf-lib
- **libpdf** is 1.91x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 782.15ms | 782.15ms | ±0.00% |       1 |
| pdf-lib         |   0.748 |    1.34s |    1.34s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.670 |    1.49s |    1.49s | ±0.00% |       1 |

- **libpdf** is 1.71x faster than pdf-lib
- **libpdf** is 1.91x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   201.7 |  4.96ms |  5.86ms | ±1.33% |     101 |
| pdf-lib         |    83.5 | 11.98ms | 14.59ms | ±2.00% |      42 |
| @cantoo/pdf-lib |    73.6 | 13.59ms | 15.17ms | ±1.91% |      37 |

- **libpdf** is 2.42x faster than pdf-lib
- **libpdf** is 2.74x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    60.4 | 16.55ms | 21.55ms | ±2.73% |      31 |
| pdf-lib         |    17.9 | 55.74ms | 59.23ms | ±2.83% |       9 |
| @cantoo/pdf-lib |    15.0 | 66.59ms | 74.09ms | ±4.27% |       8 |

- **libpdf** is 3.37x faster than pdf-lib
- **libpdf** is 4.02x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    44.5 | 22.48ms | 26.74ms | ±3.85% |      23 |
| pdf-lib         |    35.6 | 28.08ms | 36.09ms | ±4.61% |      18 |
| @cantoo/pdf-lib |    35.3 | 28.34ms | 37.71ms | ±4.82% |      18 |

- **libpdf** is 1.25x faster than pdf-lib
- **libpdf** is 1.26x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    57.3 | 17.46ms | 20.27ms | ±2.50% |      29 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    29.7 | 33.69ms | 46.80ms | ±7.45% |      15 |

- **libpdf** is 1.93x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |     p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | ------: | -----: | ------: |
| copy 1 page                     |   869.9 | 1.15ms |  2.73ms | ±3.54% |     435 |
| copy 10 pages from 100-page PDF |   210.6 | 4.75ms |  6.50ms | ±2.20% |     106 |
| copy all 100 pages              |   123.8 | 8.08ms | 10.14ms | ±1.71% |      62 |

- **copy 1 page** is 4.13x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 7.03x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |   985.2 | 1.02ms | 1.45ms | ±0.75% |     494 |
| duplicate page 0                          |   978.8 | 1.02ms | 1.49ms | ±0.85% |     490 |

- **duplicate all pages (double the document)** is 1.01x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   634.9 |  1.58ms |  2.11ms | ±1.23% |     318 |
| merge 10 small PDFs     |   122.8 |  8.14ms | 12.59ms | ±2.09% |      62 |
| merge 2 x 100-page PDFs |    62.9 | 15.90ms | 26.63ms | ±6.92% |      32 |

- **merge 2 small PDFs** is 5.17x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 10.10x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.7K |  576us | 1.13ms | ±1.30% |     869 |
| draw 100 rectangles                 |    1.5K |  677us | 1.95ms | ±3.52% |     739 |
| draw 100 circles                    |    1.1K |  947us | 2.00ms | ±1.77% |     529 |
| create 10 pages with mixed content  |   649.5 | 1.54ms | 3.03ms | ±2.29% |     325 |
| draw 100 text lines (standard font) |   618.3 | 1.62ms | 2.46ms | ±1.43% |     310 |

- **draw 100 lines** is 1.18x faster than draw 100 rectangles
- **draw 100 lines** is 1.64x faster than draw 100 circles
- **draw 100 lines** is 2.67x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.81x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   326.6 |  3.06ms |  6.14ms | ±3.03% |     164 |
| get form fields   |   295.3 |  3.39ms |  6.07ms | ±3.58% |     148 |
| flatten form      |   111.4 |  8.98ms | 14.12ms | ±3.90% |      56 |
| fill text fields  |    73.0 | 13.69ms | 17.36ms | ±4.27% |      37 |

- **read field values** is 1.11x faster than get form fields
- **read field values** is 2.93x faster than flatten form
- **read field values** is 4.47x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   15.9K |    63us |   171us | ±1.35% |   7,961 |
| load medium PDF (19KB) |   10.7K |    93us |   146us | ±0.65% |   5,365 |
| load form PDF (116KB)  |   757.6 |  1.32ms |  2.70ms | ±2.19% |     379 |
| load heavy PDF (2.0MB) |    54.8 | 18.25ms | 19.26ms | ±1.50% |      28 |

- **load small PDF (888B)** is 1.48x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 21.01x faster than load form PDF (116KB)
- **load small PDF (888B)** is 290.63x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    8.6K |   117us |   367us | ±1.71% |   4,285 |
| incremental save (19KB)            |    5.2K |   193us |   401us | ±1.42% |   2,593 |
| save with modifications (19KB)     |    1.1K |   898us |  1.67ms | ±1.92% |     557 |
| save heavy PDF (2.0MB)             |    51.9 | 19.26ms | 25.24ms | ±3.12% |      26 |
| incremental save heavy PDF (2.0MB) |    49.6 | 20.15ms | 21.36ms | ±1.24% |      25 |

- **save unmodified (19KB)** is 1.65x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.69x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 165.06x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 172.69x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   786.5 |  1.27ms |  3.30ms | ±4.06% |     394 |
| extractPages (1 page from 100-page PDF)  |   266.3 |  3.76ms |  4.52ms | ±1.00% |     134 |
| extractPages (1 page from 2000-page PDF) |    17.1 | 58.51ms | 65.81ms | ±3.27% |      10 |

- **extractPages (1 page from small PDF)** is 2.95x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 46.02x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    22.9 |  43.64ms |  48.38ms | ±2.65% |      12 |
| split 2000-page PDF (0.9MB) |     1.3 | 791.54ms | 791.54ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.14x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    16.9 | 59.25ms | 61.87ms | ±1.78% |       9 |
| extract first 100 pages from 2000-page PDF             |    15.7 | 63.69ms | 66.19ms | ±2.14% |       8 |
| extract every 10th page from 2000-page PDF (200 pages) |    13.9 | 71.82ms | 86.74ms | ±8.55% |       7 |

- **extract first 10 pages from 2000-page PDF** is 1.07x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.21x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
