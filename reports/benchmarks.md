# Benchmark Report

> Generated on 2026-08-03 at 09:54:52 UTC
>
> System: linux | AMD EPYC 9V74 80-Core Processor (4 cores) | 16GB RAM | Bun 1.3.14

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
| libpdf          |    49.8 |  20.09ms |  22.64ms | ±1.60% |      25 |
| pdf-lib         |     4.4 | 228.45ms | 246.71ms | ±2.10% |      10 |
| @cantoo/pdf-lib |     4.4 | 229.21ms | 235.52ms | ±1.21% |      10 |

- **libpdf** is 11.37x faster than pdf-lib
- **libpdf** is 11.41x faster than @cantoo/pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   13.5K |  74us |  180us | ±4.26% |   6,775 |
| @cantoo/pdf-lib |    2.7K | 365us | 1.80ms | ±3.33% |   1,369 |
| pdf-lib         |    2.4K | 409us | 2.35ms | ±6.25% |   1,224 |

- **libpdf** is 4.95x faster than @cantoo/pdf-lib
- **libpdf** is 5.54x faster than pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    9.0K | 111us |  200us | ±1.66% |   4,521 |
| @cantoo/pdf-lib |    2.6K | 386us | 2.63ms | ±4.58% |   1,295 |
| pdf-lib         |    2.3K | 431us | 2.24ms | ±5.02% |   1,161 |

- **libpdf** is 3.49x faster than @cantoo/pdf-lib
- **libpdf** is 3.90x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.9K |  345us | 1.09ms | ±1.99% |   1,448 |
| pdf-lib         |   725.9 | 1.38ms | 6.48ms | ±7.58% |     363 |
| @cantoo/pdf-lib |   644.3 | 1.55ms | 4.30ms | ±6.51% |     324 |

- **libpdf** is 3.99x faster than pdf-lib
- **libpdf** is 4.49x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    47.4 |  21.10ms |  26.58ms | ±3.91% |      24 |
| pdf-lib         |     3.1 | 327.83ms | 343.42ms | ±1.61% |      10 |
| @cantoo/pdf-lib |     1.8 | 554.45ms | 568.56ms | ±1.07% |      10 |

- **libpdf** is 15.54x faster than pdf-lib
- **libpdf** is 26.28x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.1 | 319.83ms | 331.54ms | ±1.16% |      10 |
| libpdf          |     2.8 | 355.49ms | 370.68ms | ±1.44% |      10 |
| @cantoo/pdf-lib |     1.8 | 549.21ms | 563.03ms | ±1.12% |      10 |

- **pdf-lib** is 1.11x faster than libpdf
- **pdf-lib** is 1.72x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   289.7 | 3.45ms |  4.38ms | ±1.25% |     145 |
| pdf-lib         |   111.1 | 9.00ms | 10.54ms | ±1.88% |      56 |
| @cantoo/pdf-lib |   105.8 | 9.45ms | 11.10ms | ±2.25% |      53 |

- **libpdf** is 2.61x faster than pdf-lib
- **libpdf** is 2.74x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |      p99 |     RME | Samples |
| :-------------- | ------: | ------: | -------: | ------: | ------: |
| libpdf          |    26.5 | 37.74ms |  41.76ms |  ±1.91% |      14 |
| pdf-lib         |    14.3 | 69.85ms |  73.03ms |  ±3.63% |       8 |
| @cantoo/pdf-lib |    12.9 | 77.74ms | 103.17ms | ±13.98% |       7 |

- **libpdf** is 1.85x faster than pdf-lib
- **libpdf** is 2.06x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.4 | 721.66ms | 721.66ms | ±0.00% |       1 |
| pdf-lib         |   0.762 |    1.31s |    1.31s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.727 |    1.38s |    1.38s | ±0.00% |       1 |

- **libpdf** is 1.82x faster than pdf-lib
- **libpdf** is 1.91x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   225.0 |  4.45ms |  5.51ms | ±1.43% |     113 |
| pdf-lib         |    85.3 | 11.72ms | 13.04ms | ±1.60% |      43 |
| @cantoo/pdf-lib |    75.7 | 13.20ms | 14.64ms | ±1.86% |      38 |

- **libpdf** is 2.64x faster than pdf-lib
- **libpdf** is 2.97x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    64.9 | 15.41ms | 18.36ms | ±1.68% |      33 |
| pdf-lib         |    18.8 | 53.17ms | 55.32ms | ±1.08% |      10 |
| @cantoo/pdf-lib |    15.8 | 63.20ms | 64.42ms | ±1.12% |       8 |

- **libpdf** is 3.45x faster than pdf-lib
- **libpdf** is 4.10x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    42.8 | 23.35ms | 45.06ms | ±9.78% |      22 |
| @cantoo/pdf-lib |    37.2 | 26.87ms | 33.40ms | ±3.60% |      19 |
| pdf-lib         |    34.6 | 28.90ms | 43.90ms | ±8.05% |      18 |

- **libpdf** is 1.15x faster than @cantoo/pdf-lib
- **libpdf** is 1.24x faster than pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    61.6 | 16.23ms | 18.56ms | ±2.23% |      31 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    31.8 | 31.49ms | 48.46ms | ±7.98% |      16 |

- **libpdf** is 1.94x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |    p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | -----: | -----: | ------: |
| copy 1 page                     |   965.5 | 1.04ms | 1.85ms | ±2.19% |     483 |
| copy 10 pages from 100-page PDF |   224.1 | 4.46ms | 7.64ms | ±2.43% |     113 |
| copy all 100 pages              |   132.3 | 7.56ms | 8.27ms | ±0.95% |      67 |

- **copy 1 page** is 4.31x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 7.30x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |  Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | ----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |    1.1K | 944us | 1.47ms | ±0.94% |     530 |
| duplicate page 0                          |    1.1K | 951us | 1.51ms | ±1.00% |     526 |

- **duplicate all pages (double the document)** is 1.01x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   680.0 |  1.47ms |  2.02ms | ±1.12% |     340 |
| merge 10 small PDFs     |   127.3 |  7.85ms | 11.51ms | ±2.30% |      64 |
| merge 2 x 100-page PDFs |    68.4 | 14.61ms | 18.08ms | ±2.12% |      35 |

- **merge 2 small PDFs** is 5.34x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.94x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.8K |  567us | 1.21ms | ±1.39% |     883 |
| draw 100 rectangles                 |    1.5K |  646us | 1.75ms | ±2.63% |     774 |
| draw 100 circles                    |    1.1K |  947us | 1.85ms | ±1.83% |     529 |
| create 10 pages with mixed content  |   665.1 | 1.50ms | 2.58ms | ±2.26% |     333 |
| draw 100 text lines (standard font) |   616.7 | 1.62ms | 2.57ms | ±1.61% |     309 |

- **draw 100 lines** is 1.14x faster than draw 100 rectangles
- **draw 100 lines** is 1.67x faster than draw 100 circles
- **draw 100 lines** is 2.65x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.86x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   362.7 |  2.76ms |  4.90ms | ±2.10% |     182 |
| get form fields   |   325.2 |  3.08ms |  6.26ms | ±4.15% |     163 |
| flatten form      |   120.3 |  8.31ms | 10.40ms | ±1.40% |      61 |
| fill text fields  |    79.3 | 12.61ms | 17.13ms | ±4.40% |      40 |

- **read field values** is 1.12x faster than get form fields
- **read field values** is 3.02x faster than flatten form
- **read field values** is 4.57x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   17.7K |    57us |   176us | ±2.56% |   8,839 |
| load medium PDF (19KB) |   11.8K |    85us |   147us | ±0.77% |   5,909 |
| load form PDF (116KB)  |   790.2 |  1.27ms |  2.36ms | ±2.03% |     396 |
| load heavy PDF (2.0MB) |    51.7 | 19.33ms | 20.19ms | ±1.49% |      26 |

- **load small PDF (888B)** is 1.50x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 22.37x faster than load form PDF (116KB)
- **load small PDF (888B)** is 341.78x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |   10.0K |   100us |   259us | ±1.81% |   4,979 |
| incremental save (19KB)            |    6.7K |   150us |   360us | ±1.30% |   3,345 |
| save with modifications (19KB)     |    1.3K |   773us |  1.47ms | ±1.74% |     647 |
| save heavy PDF (2.0MB)             |    50.5 | 19.80ms | 21.67ms | ±1.27% |      26 |
| incremental save heavy PDF (2.0MB) |    47.5 | 21.05ms | 22.05ms | ±1.47% |      24 |

- **save unmodified (19KB)** is 1.49x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.70x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 197.12x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 209.58x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   930.4 |  1.07ms |  2.44ms | ±3.21% |     466 |
| extractPages (1 page from 100-page PDF)  |   297.7 |  3.36ms |  5.65ms | ±1.70% |     149 |
| extractPages (1 page from 2000-page PDF) |    18.5 | 54.11ms | 56.03ms | ±0.98% |      10 |

- **extractPages (1 page from small PDF)** is 3.12x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 50.35x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    26.4 |  37.86ms |  40.79ms | ±1.72% |      14 |
| split 2000-page PDF (0.9MB) |     1.4 | 694.13ms | 694.13ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.33x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |      p99 |     RME | Samples |
| :----------------------------------------------------- | ------: | ------: | -------: | ------: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.7 | 56.37ms |  58.02ms |  ±1.04% |       9 |
| extract first 100 pages from 2000-page PDF             |    16.6 | 60.13ms |  61.67ms |  ±1.35% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    13.8 | 72.29ms | 104.19ms | ±18.40% |       7 |

- **extract first 10 pages from 2000-page PDF** is 1.07x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.28x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
