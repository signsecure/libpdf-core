# Benchmark Report

> Generated on 2026-10-26 at 12:34:11 UTC
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
| libpdf          |    52.8 |  18.93ms |  21.53ms | ±1.88% |      27 |
| @cantoo/pdf-lib |     4.5 | 224.53ms | 226.82ms | ±0.63% |      10 |
| pdf-lib         |     4.3 | 232.83ms | 242.62ms | ±1.62% |      10 |

- **libpdf** is 11.86x faster than @cantoo/pdf-lib
- **libpdf** is 12.30x faster than pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   11.2K |  89us |  187us | ±3.45% |   5,595 |
| pdf-lib         |    2.7K | 365us | 1.67ms | ±3.02% |   1,369 |
| @cantoo/pdf-lib |    2.5K | 393us | 1.77ms | ±2.81% |   1,271 |

- **libpdf** is 4.09x faster than pdf-lib
- **libpdf** is 4.40x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    7.7K | 129us |  231us | ±1.21% |   3,874 |
| @cantoo/pdf-lib |    2.3K | 432us | 2.39ms | ±4.32% |   1,158 |
| pdf-lib         |    2.2K | 463us | 2.12ms | ±4.10% |   1,081 |

- **libpdf** is 3.35x faster than @cantoo/pdf-lib
- **libpdf** is 3.58x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.8K |  363us |  966us | ±1.73% |   1,380 |
| pdf-lib         |   615.7 | 1.62ms | 6.82ms | ±8.72% |     308 |
| @cantoo/pdf-lib |   493.6 | 2.03ms | 7.50ms | ±8.12% |     247 |

- **libpdf** is 4.48x faster than pdf-lib
- **libpdf** is 5.59x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    52.5 |  19.03ms |  24.55ms | ±2.86% |      27 |
| pdf-lib         |     3.0 | 331.75ms | 343.12ms | ±1.28% |      10 |
| @cantoo/pdf-lib |     1.8 | 563.91ms | 604.13ms | ±2.01% |      10 |

- **libpdf** is 17.43x faster than pdf-lib
- **libpdf** is 29.63x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.0 | 330.11ms | 346.23ms | ±1.58% |      10 |
| libpdf          |     2.8 | 356.83ms | 370.02ms | ±1.57% |      10 |
| @cantoo/pdf-lib |     1.8 | 562.05ms | 582.73ms | ±1.12% |      10 |

- **pdf-lib** is 1.08x faster than libpdf
- **pdf-lib** is 1.70x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   261.3 | 3.83ms |  5.33ms | ±2.00% |     131 |
| pdf-lib         |   104.4 | 9.58ms | 13.46ms | ±2.57% |      53 |
| @cantoo/pdf-lib |   100.6 | 9.94ms | 12.00ms | ±2.33% |      51 |

- **libpdf** is 2.50x faster than pdf-lib
- **libpdf** is 2.60x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    23.7 | 42.18ms | 44.44ms | ±1.91% |      12 |
| pdf-lib         |    12.8 | 77.86ms | 87.22ms | ±6.48% |       7 |
| @cantoo/pdf-lib |    12.3 | 81.09ms | 84.74ms | ±2.48% |       7 |

- **libpdf** is 1.85x faster than pdf-lib
- **libpdf** is 1.92x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 787.84ms | 787.84ms | ±0.00% |       1 |
| pdf-lib         |   0.727 |    1.38s |    1.38s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.661 |    1.51s |    1.51s | ±0.00% |       1 |

- **libpdf** is 1.75x faster than pdf-lib
- **libpdf** is 1.92x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   210.2 |  4.76ms |  5.71ms | ±1.30% |     106 |
| pdf-lib         |    83.8 | 11.93ms | 14.41ms | ±1.86% |      42 |
| @cantoo/pdf-lib |    74.8 | 13.36ms | 15.04ms | ±1.76% |      38 |

- **libpdf** is 2.51x faster than pdf-lib
- **libpdf** is 2.81x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    60.2 | 16.62ms | 17.45ms | ±1.08% |      31 |
| pdf-lib         |    18.2 | 54.86ms | 56.36ms | ±1.51% |      10 |
| @cantoo/pdf-lib |    14.8 | 67.74ms | 77.62ms | ±5.10% |       8 |

- **libpdf** is 3.30x faster than pdf-lib
- **libpdf** is 4.08x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    45.6 | 21.93ms | 26.35ms | ±3.63% |      23 |
| @cantoo/pdf-lib |    35.3 | 28.37ms | 39.14ms | ±5.13% |      18 |
| pdf-lib         |    34.5 | 29.01ms | 40.47ms | ±5.79% |      18 |

- **libpdf** is 1.29x faster than @cantoo/pdf-lib
- **libpdf** is 1.32x faster than pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    56.2 | 17.79ms | 21.37ms | ±2.71% |      29 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    29.8 | 33.60ms | 38.24ms | ±3.81% |      15 |

- **libpdf** is 1.89x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |     p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | ------: | -----: | ------: |
| copy 1 page                     |   821.2 | 1.22ms |  2.96ms | ±3.26% |     411 |
| copy 10 pages from 100-page PDF |   200.6 | 4.99ms |  7.34ms | ±2.01% |     101 |
| copy all 100 pages              |   119.4 | 8.37ms | 13.71ms | ±2.92% |      60 |

- **copy 1 page** is 4.09x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 6.88x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate page 0                          |   940.9 | 1.06ms | 1.50ms | ±0.88% |     471 |
| duplicate all pages (double the document) |   940.2 | 1.06ms | 1.63ms | ±1.14% |     471 |

- **duplicate page 0** is 1.00x faster than duplicate all pages (double the document)

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   612.3 |  1.63ms |  2.15ms | ±1.12% |     307 |
| merge 10 small PDFs     |   113.7 |  8.79ms | 14.40ms | ±2.64% |      57 |
| merge 2 x 100-page PDFs |    64.6 | 15.47ms | 20.44ms | ±2.41% |      33 |

- **merge 2 small PDFs** is 5.38x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.47x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.7K |  597us | 1.29ms | ±1.44% |     838 |
| draw 100 rectangles                 |    1.5K |  671us | 1.93ms | ±2.84% |     746 |
| draw 100 circles                    |    1.0K |  984us | 1.93ms | ±1.71% |     509 |
| create 10 pages with mixed content  |   643.4 | 1.55ms | 2.66ms | ±1.97% |     322 |
| draw 100 text lines (standard font) |   588.8 | 1.70ms | 3.07ms | ±2.16% |     295 |

- **draw 100 lines** is 1.12x faster than draw 100 rectangles
- **draw 100 lines** is 1.65x faster than draw 100 circles
- **draw 100 lines** is 2.60x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.85x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   331.9 |  3.01ms |  5.31ms | ±2.44% |     166 |
| get form fields   |   292.4 |  3.42ms |  7.46ms | ±4.33% |     147 |
| flatten form      |   118.4 |  8.44ms | 10.86ms | ±1.55% |      60 |
| fill text fields  |    73.0 | 13.70ms | 18.87ms | ±4.10% |      37 |

- **read field values** is 1.14x faster than get form fields
- **read field values** is 2.80x faster than flatten form
- **read field values** is 4.55x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   15.9K |    63us |   168us | ±1.45% |   7,960 |
| load medium PDF (19KB) |   10.5K |    95us |   175us | ±0.77% |   5,254 |
| load form PDF (116KB)  |   765.3 |  1.31ms |  2.02ms | ±1.14% |     383 |
| load heavy PDF (2.0MB) |    55.0 | 18.18ms | 20.31ms | ±1.96% |      28 |

- **load small PDF (888B)** is 1.52x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 20.80x faster than load form PDF (116KB)
- **load small PDF (888B)** is 289.35x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    8.6K |   117us |   307us | ±1.71% |   4,285 |
| incremental save (19KB)            |    5.4K |   185us |   396us | ±1.35% |   2,703 |
| save with modifications (19KB)     |    1.2K |   860us |  1.58ms | ±1.65% |     582 |
| save heavy PDF (2.0MB)             |    52.2 | 19.17ms | 20.86ms | ±1.80% |      27 |
| incremental save heavy PDF (2.0MB) |    50.2 | 19.90ms | 22.88ms | ±2.12% |      26 |

- **save unmodified (19KB)** is 1.59x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.37x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 164.30x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 170.58x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   813.4 |  1.23ms |  2.83ms | ±3.61% |     407 |
| extractPages (1 page from 100-page PDF)  |   273.3 |  3.66ms |  4.46ms | ±1.33% |     137 |
| extractPages (1 page from 2000-page PDF) |    17.5 | 56.98ms | 57.59ms | ±0.77% |      10 |

- **extractPages (1 page from small PDF)** is 2.98x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 46.35x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    23.6 |  42.34ms |  45.96ms | ±2.71% |      12 |
| split 2000-page PDF (0.9MB) |     1.3 | 748.56ms | 748.56ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 17.68x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.1 | 58.50ms | 59.83ms | ±1.14% |       9 |
| extract first 100 pages from 2000-page PDF             |    15.9 | 62.88ms | 64.09ms | ±1.50% |       8 |
| extract every 10th page from 2000-page PDF (200 pages) |    14.2 | 70.56ms | 73.48ms | ±1.76% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.07x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.21x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
