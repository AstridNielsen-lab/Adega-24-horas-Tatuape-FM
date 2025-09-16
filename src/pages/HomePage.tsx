import React, { useState, useMemo } from 'react';
import { useSearchStore } from '../store/searchStore';
import { Product, ProductCategory } from '../types/Product';

const productCategories: ProductCategory[] = [
  {
    id: 'tabacaria',
    name: 'Tabacaria',
    products: [
      // Cigarros
      {
        id: 'marlboro',
        name: 'Marlboro',
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://www.ciggiesworld.ch/wp-content/uploads/2017/07/Marlboro-Red-Premium-Class-Cigarette.jpg',
        category: 'Tabacaria',
        volume: 'Maço',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'lucky-strike',
        name: 'Lucky Strike',
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://cigarretetabacaria.com/wp-content/uploads/2023/03/cigarro-lucky-strike-original-blue-box-248927.jpg',
        category: 'Tabacaria',
        volume: 'Maço',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'camel',
        name: 'Camel',
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://www.lgatacado.com.br/wp-content/uploads/sites/3994/2023/08/Story-Neon-Moderno-Oferta-de-Produto-17-1.png',
        category: 'Tabacaria',
        volume: 'Maço',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'benson-hedges',
        name: 'Benson & Hedges',
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://tpackss.globaltobaccocontrol.org/sites/default/files/styles/500x500/public/2023-11/MEX_MEC_L3_02_003_0_0_2_2.jpg?itok=vAX4otvL',
        category: 'Tabacaria',
        volume: 'Maço',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'hollywood',
        name: 'Hollywood',
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://i.pinimg.com/originals/1f/e6/0a/1fe60aad0273e1af182beb2bdd076c10.jpg',
        category: 'Tabacaria',
        volume: 'Maço',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'gudang-garam',
        name: 'Gudang Garam',
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://th.bing.com/th/id/R.f1b3cc4504576cf88ce891a35339e64b?rik=Fa5PlTc26rmuww&riu=http%3a%2f%2fmacbeese.com%2fwp-content%2fuploads%2f2014%2f05%2fgduang-garam-professional.jpg&ehk=Mmyr4adFHufT3neZs0cdLi50ig%2bpkDCbNe8Hix4P288%3d&risl=&pid=ImgRaw&r=0',
        category: 'Tabacaria',
        volume: 'Maço',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      // Essências de Narguile
      {
        id: 'essencia-ziggy-berry',
        name: 'Essência Ziggy Berry',
        price: 18.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/4ade80/ffffff?text=Ess%C3%AAncia+Ziggy+Berry',
        category: 'Narguile',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'essencia-ziggy-menta',
        name: 'Essência Ziggy Menta',
        price: 18.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/22c55e/ffffff?text=Ess%C3%AAncia+Ziggy+Menta',
        category: 'Narguile',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'essencia-ziggy-uva',
        name: 'Essência Ziggy Uva',
        price: 18.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Ess%C3%AAncia+Ziggy+Uva',
        category: 'Narguile',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'essencia-ziggy-tropical',
        name: 'Essência Ziggy Tropical',
        price: 18.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=Ess%C3%AAncia+Ziggy+Tropical',
        category: 'Narguile',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'essencia-ziggy-maca',
        name: 'Essência Ziggy Maçã',
        price: 18.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/ef4444/ffffff?text=Ess%C3%AAncia+Ziggy+Ma%C3%A7%C3%A3',
        category: 'Narguile',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'essencia-ziggy-limao',
        name: 'Essência Ziggy Limão',
        price: 18.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/eab308/ffffff?text=Ess%C3%AAncia+Ziggy+Lim%C3%A3o',
        category: 'Narguile',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'rosh-clover',
        name: 'Rosh Clover',
        price: 29.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/1f2937/ffffff?text=Rosh+Clover',
        category: 'Narguile',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'folha-aluminio-asterisco',
        name: 'Folha de Alumínio para Narguile - Asterisco (caixinha)',
        price: 28.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/f97316/ffffff?text=Folha+Alum%C3%ADnio+Asterisco',
        category: 'Narguile',
        volume: 'Caixinha',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'carvao-stork',
        name: 'Carvão Stork, fibra coco 1kg',
        price: 50.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/374151/ffffff?text=Carv%C3%A3o+Stork+1kg',
        category: 'Tabacaria',
        volume: '1kg',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      // Acessórios para fumar
      {
        id: 'dichavador-beizze',
        name: 'Dichavadores Trituradores marca Beizze',
        price: 10.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/374151/ffffff?text=Dichavador+Beizze',
        category: 'Tabacaria',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'seda-zomo',
        name: 'Seda Zomo Seda Natural Brown King Size',
        price: 10.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/d97706/ffffff?text=Seda+Zomo+Brown',
        category: 'Tabacaria',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      },
      {
        id: 'isqueiro-pedra',
        name: 'Isqueiro Pedra',
        price: 8.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://via.placeholder.com/300x300/dc2626/ffffff?text=Isqueiro+Pedra',
        category: 'Tabacaria',
        volume: 'Unidade',
        inStock: true,
        isAlcoholic: false,
        isTabacco: true
      }
    ]
  },
  {
    id: 'destaques',
    name: 'Destaques',
    products: [
      {
        id: 'whisky-grants',
        name: 'Whisky White Horse 500ml',
        price: 97.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202301251147_bn3iotc9i9.jpg',
        category: 'Whisky',
        volume: 'Garrafa 500ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'agua-sao-lourenco',
        name: 'Água de Coco Esterilizada Coco Quadrado 200ml',
        price: 5.75,
        originalPrice: 5.78,
        description: 'Embalagem 200ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202302061238_ty8s5dss9q.jpg',
        category: 'Águas',
        volume: 'Embalagem 200ml',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'red-bull',
        name: 'Energético Red Bull Energy Drink 250 Ml',
        price: 18.98,
        description: 'Lata 250ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202408281002_2paju92uril.png',
        category: 'Energéticos',
        volume: 'Lata 250ml',
        inStock: true,
        temperature: 'gelada'
      }
    ]
  },
  {
    id: 'vinhos',
    name: 'Vinhos',
    products: [
      {
        id: 'espumante-salton',
        name: 'Espumante Brut Rosé Salton 750ml',
        price: 82.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190415_ekrije4yizi.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'lambrusco-villa-giada',
        name: 'Frisante Italiano Tinto Lambrusco Villa Giada Amabile 750ml',
        price: 55.00,
        originalPrice: 90.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211090841_88zse6ny4s9.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'santa-carolina-cab-merlot',
        name: 'Santa Carolina Cabernet Sauvignon Merlot Vinho Tinto Chileno 750ml',
        price: 55.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/29aa6191-cf23-4569-a8c3-d7bd66d877b5/202408062107_6631_i.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'santa-carolina-Chardonnay',
        name: 'Santa Carolina Chardonnay Vinho Chileno Branco 750ml',
        price: 57.50,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211091148_uejd0bajwp9.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
       {
        id: 'santa-carolina-Sauvignon-Blanc',
        name: 'Santa Carolina Sauvignon Blanc Vinho Chileno Branco 750ml',
        price: 55.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/d29d1980-6795-4180-8f01-49cdb4a8df76/202106110318_nzh5x6hyze.jpeg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
       {
        id: 'santa-carolina-Carmenere',
        name: 'Santa Carolina Carmenère Vinho Chileno Tinto 750ml',
        price: 55.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202405251019_90wdwwb49g.png',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
        {
        id: 'santa-carolina-Malbec',
        name: 'Santa Carolina Malbec Vinho Chileno Tinto 750ml',
        price: 57.50,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211091205_ravlvtyb2f.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'santa-carolina-Malbec',
        name: 'Santa Carolina Cabernet Sauvignon Vinho Chileno Tinto 750ml',
        price: 55.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/d29d1980-6795-4180-8f01-49cdb4a8df76/202106110318_bc2jcegna66.png',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
       {
        id: 'santa-carolina-Merlot',
        name: 'Santa Carolina Merlot Vinho Chileno Tinto 750ml',
        price: 57.50,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/29aa6191-cf23-4569-a8c3-d7bd66d877b5/202403242035_5428_i.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
        {
        id: 'santa-carolina-suave',
        name: 'Santa Carolina Suave Vinho Chileno Tinto 750ml',
        price: 57.50,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202503201212_q00bw1864c9.jpeg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
       {
        id: 'santa-carolina-suave-branco',
        name: 'Santa Carolina Suave Vinho Chileno Branco 750ml',
        price: 50.98,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211091147_f8i478xemco.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
       {
        id: 'olaria-tinto-suave',
        name: 'Vinho Tinto Suave Olaria 750ml',
        price: 87.50,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190347_5gsaylkqxm.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
       {
        id: 'santa-carolina-cab-merlot',
        name: 'Vinho Sul-Africano Rosé Nederburg 750ml',
        price: 129.50,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211080844_zg0utla96g.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
       {
        id: 'santa-carolina-cab-merlot',
        name: 'Vinho Sul-Africano 1791 Pinotage Nederburg 750ml',
        price: 119.99,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210180215_dsqy4ypv0a.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'lambrusco-villa-fabrizia',
        name: 'Vinho Branco Lambrusco Villa Fabrizia Garrafa 750ml',
        price: 76.65,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210180018_ohuzjwszq0m.jpg',
        category: 'Vinhos',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      }
    ]
  },
  {
    id: 'cervejas',
    name: 'Cervejas',
    products: [
      {
        id: 'weissbier-paulaner',
        name: 'Cerveja Alemã Weissbier Dunkel Paulaner 500ml',
        price: 37.50,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211100802_8xlsu22sp7k.jpg',
        category: 'Cervejas',
        volume: 'Garrafa 500ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
      {
        id: 'antarctica-original',
        name: 'Cerveja Bohemia Puro Malte 269ml',
        price: 6.78,
        originalPrice: 6.99,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192221_7k8xef6p7te.jpg',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Brahma Duplo Malte 269ml',
        price: 5.79,
        originalPrice: 6.75,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202307171949_k4wct05u4mf.jpg',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Budweiser Lata 269ml',
        price: 6.99,
        originalPrice: 8.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190038_ysdaqcw3lck.jpg',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Estrella Galicia Lata 269ml',
        price: 7.98,
        originalPrice: 8.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202307060116_xwy09g197es.jpg',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Extra Em Lata Corona 269ml',
        price: 11.23,
        originalPrice: 15.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202404081141_ple0gxqur7s.png',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Heineken 350ml',
        price: 10.58,
        originalPrice: 13.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182346_tqud55dpmvg.jpg',
        category: 'Cervejas',
        volume: 'Lata 350ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Heineken Lata com 269ml',
        price: 9.38,
        originalPrice: 10.78,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202401300900_pre537n3v3j.png',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Lager Red Stripe 330ml',
        price: 14.84,
        originalPrice: 17.50,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202301131353_4wln3jprwhh.jpg',
        category: 'Cervejas',
        volume: 'Lata 330ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Lata Amstel 269ml',
        price: 7.98,
        originalPrice: 8.79,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202310090932_xb8ft6e2hg.jpg',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Long Neck Becks Puro Malte 330ml',
        price: 15.98,
        originalPrice: 17.78,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192233_twmwdvkwwi8.jpg',
        category: 'Cervejas',
        volume: 'Lata 330ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Pilsen Skol 269ml',
        price: 5.76,
        originalPrice: 7.59,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202303161512_4yo5ilpr8yp.jpg',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Pure Gold Sem Glúten Long Neck Stella Artois 330ml',
        price: 13.32,
        originalPrice: 15.78,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202307181409_43yb1eo953i.jpg',
        category: 'Cervejas',
        volume: 'Lata 330ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Spaten Puro Malte 350ml Lata',
        price: 10.63,
        originalPrice: 13.78,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202501091044_x9xys8n0yif.png',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Kit Cerveja Weissbier E Dunkel Paulaner Munchen 500ml',
        price: 175.00,
        originalPrice: 210.78,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202406200858_u6zfq9czspb.png',
        category: 'Cervejas',
        volume: 'Kit 500ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Petra Pilsen 269ml',
        price: 5.99,
        originalPrice: 7.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192137_drz235sz2bb.jpg',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Cerveja Alemã Lemon Radler Paulaner 500ml',
        price: 19.70,
        originalPrice: 27.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202305251055_3dgznbgno98.jpg',
        category: 'Cervejas',
        volume: 'Lata 500ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
       {
        id: 'antarctica-original',
        name: 'Skol Beats Senses 269ml',
        price: 7.96,
        originalPrice: 15.98,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190049_1skamfdgwez.jpg',
        category: 'Cervejas',
        volume: 'Lata 269ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      },
      {
        id: 'becks',
        name: 'Cerveja Becks 350ml',
        price: 10.63,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190248_sexk6xc1y9o.jpg',
        category: 'Cervejas',
        volume: 'Embalagem 350ml',
        inStock: true,
        isAlcoholic: true,
        temperature: 'gelada'
      }
    ]
  },
  {
    id: 'refrigerantes',
    name: 'Refrigerantes',
    products: [
      {
        id: 'coca-cola-310ml',
        name: 'Coca-Cola Original 2,5l',
        price: 27.48,
        description: 'Garrafa 2,5l',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192201_6gu6msq5pt.jpg',
        category: 'Refrigerantes',
        volume: 'Garrafa 2,5l',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'coca-cola-310ml',
        name: "Drink Pronto Jack Daniel's Com Coca-Cola Jack And Coke 350ml",
        price: 24.98,
        description: 'Lata 350ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202407101505_dwwhshkx01v.png',
        category: 'Refrigerantes',
        volume: 'Lata 350ml',
        inStock: true,
        temperature: 'gelada'
      },      
      {
        id: 'coca-cola-310ml',
        name: 'Fanta Uva 2l',
        price: 16.98,
        description: 'Garrafa 2l',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182322_001h617rxy10e.jpg',
        category: 'Refrigerantes',
        volume: 'Garrafa 2l',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'coca-cola-310ml',
        name: 'Refrigerante Laranja Sukita 2l',
        price: 12.00,
        description: 'Garrafa 2l',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202310240829_dd52xyzfea.jpg',
        category: 'Refrigerantes',
        volume: 'Garrafa 2l',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'coca-cola-310ml',
        name: 'Refrigerante Limão H2oh Limão 500ml',
        price: 10.22,
        description: 'Garrafa 500ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190033_3klbup9pcb7.jpg',
        category: 'Refrigerantes',
        volume: 'Garrafa 500ml',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'coca-cola-310ml',
        name: 'Refrigerante Original Coca Cola 2l',
        price: 23.00,
        description: 'Garrafa 2l',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202411271113_a4gb5i2eei5.png',
        category: 'Refrigerantes',
        volume: 'Garrafa 2l',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'coca-cola-310ml',
        name: 'Refrigerante Pepsi Garrafa 2,5l',
        price: 18.88,
        description: 'Garrafa 2l',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202501281118_la36dmcgrpj.png',
        category: 'Refrigerantes',
        volume: 'Garrafa 2l',
        inStock: true,
        temperature: 'gelada'
      },      
      {
        id: 'coca-cola-310ml',
        name: 'Coca-Cola Original 310ml',
        price: 7.18,
        description: 'Lata 310ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202410021501_608nw0x48jk.jpeg',
        category: 'Refrigerantes',
        volume: 'Lata 310ml',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'pepsi-zero',
        name: 'Refrigerante de Cola Zero Pepsi 350ml',
        price: 6.38,
        description: 'Lata 350ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210200247_gz6n8ey2rgs.jpg',
        category: 'Refrigerantes',
        volume: 'Lata 350ml',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'fanta-laranja',
        name: 'Fanta Laranja 2l',
        price: 18.58,
        description: 'Garrafa 2l',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182323_lsf1hzj3mx.jpg',
        category: 'Refrigerantes',
        volume: 'Garrafa 2l',
        inStock: true,
        temperature: 'gelada'
      }
    ]
  },
  {
    id: 'energeticos',
    name: 'Energéticos',
    products: [
      {
        id: 'red-bull',
        name: 'Energético Red Bull Energy Drink 250 Ml',
        price: 18.98,
        description: 'Lata 250ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202408281002_2paju92uril.png',
        category: 'Energéticos',
        volume: 'Lata 250ml',
        inStock: true,
        temperature: 'gelada'
      },   
      {
        id: 'red-bull',
        name: 'Energético Baly Melancia 2l',
        price: 18.98,
        description: 'Garrafa 2l',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190012_hbace64jn2t.jpg',
        category: 'Energéticos',
        volume: 'Garrafa 2l',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'red-bull',
        name: 'Energético Frutas Tropicais Baly 2l',
        price: 23.98,
        description: 'Garrafa 2l',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202410082019_t5mgyavn06q.jpeg',
        category: 'Energéticos',
        volume: 'Garrafa 2l',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'baly-tradicional',
        name: 'Energético Tradicional Baly 2l',
        price: 18.98,
        originalPrice: 19.98,
        description: 'Garrafa 2l',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202305190948_0qdp4letz0b.jpg',
        category: 'Energéticos',
        volume: 'Garrafa 2l',
        inStock: true,
        temperature: 'gelada'
      }
    ]
  },
  {
    id: 'aguas',
    name: 'Águas',
    products: [
      {
        id: 'agua-sao-lourenco',
        name: 'Água Mineral Sem Gás São Lourenço 1260ml',
        price: 11.80,
        originalPrice: 12.90,
        description: 'Garrafa 1260ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182335_vdii0k0tel.jpg',
        category: 'Águas',
        volume: 'Garrafa 1260ml',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'agua-sao-lourenco',
        name: 'Água Mineral Sem Gás São Lourenço 300ml',
        price: 5.13,
        originalPrice: 5.78,
        description: 'Garrafa 1260ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190105_676mevqbvj3.jpg',
        category: 'Águas',
        volume: 'Garrafa 300ml',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'agua-sao-lourenco',
        name: 'Água de Coco Esterilizada Coco Quadrado 200ml',
        price: 5.75,
        originalPrice: 5.78,
        description: 'Embalagem 200ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202302061238_ty8s5dss9q.jpg',
        category: 'Águas',
        volume: 'Embalagem 200ml',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'agua-sao-lourenco',
        name: 'Água Mineral Voss 375ml',
        price: 56.98,
        originalPrice: 60.89,
        description: 'Garrafa 375ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190247_94p1cqrsl8g.jpg',
        category: 'Águas',
        volume: 'Garrafa 1260ml',
        inStock: true,
        temperature: 'gelada'
      },
      {
        id: 'agua-crystal',
        name: 'Água Mineral com Gás Crystal 500ml',
        price: 4.78,
        originalPrice: 6.00,
        description: 'Garrafa 500ml',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202407101432_rvjidl6lan.png',
        category: 'Águas',
        volume: 'Garrafa 500ml',
        inStock: true,
        temperature: 'gelada'
      }
    ]
  },
  {
    id: 'destilados',
    name: 'Destilados',
    products: [
      {
        id: 'conhaque-domecq',
        name: 'Conhaque Domecq 1l',
        price: 100.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210192201_rxehwivheqh.jpg',
        category: 'Destilados',
        volume: 'Garrafa 1l',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'conhaque-dreher',
        name: 'Conhaque Dreher 900ml',
        price: 38.98,
        originalPrice: 49.80,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202310021842_53yodnomjyg.jpg',
        category: 'Destilados',
        volume: 'Garrafa 900ml',
        inStock: true,
        isAlcoholic: true
      }
    ]
  },
  {
    id: 'gin',
    name: 'Gin',
    products: [
      {
        id: 'gin-apogee',
        name: 'Gin Apogee 1l',
        price: 103.27,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202303081317_upta0dhjtjp.jpg',
        category: 'Gin',
        volume: 'Garrafa 1l',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'gin-apogee',
        name: 'Gin Brasileiro Apogee Negroni 1l',
        price: 103.27,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202211091212_rh55gss6rgr.jpg',
        category: 'Gin',
        volume: 'Garrafa 1l',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'gin-apogee',
        name: 'Gin London Dry de Citrus Apogee 1l',
        price: 103.27,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202305272109_tntws91nbkp.jpg',
        category: 'Gin',
        volume: 'Garrafa 1l',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'gin-apogee',
        name: 'Gin Eternity 900ml',
        price: 49.80,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210181007_kh7ljq82ule.jpg',
        category: 'Gin',
        volume: 'Garrafa 900ml',
        inStock: true,
        isAlcoholic: true
      },     
      {
        id: 'gin-apogee',
        name: 'Gin Seagers 980ml',
        price: 103.27,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210200052_zrpe8xchln.jpg',
        category: 'Gin',
        volume: 'Garrafa 980ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'gin-rocks',
        name: 'Gin Rocks Garrafa 1l',
        price: 71.80,
        originalPrice: 118.29,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202301021547_8sxhwor8wkd.jpg',
        category: 'Gin',
        volume: 'Garrafa 1l',
        inStock: true,
        isAlcoholic: true
      }
    ]
  },   
  {
    id: 'whisky',
    name: 'Whisky',
    products: [
      {
        id: 'whisky-grants',
        name: 'Licor de Whisky Escocês Passport Honey 670ml',
        price: 191.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182302_5lhqdht6z49.jpg',
        category: 'Whisky',
        volume: 'Garrafa 670ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'whisky-bells',
        name: 'Whisky Bell\'s 700ml',
        price: 131.78,
        originalPrice: 150.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_low/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202212050852_qzkp9gshnmf.jpg',
        category: 'Whisky',
        volume: 'Garrafa 700ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'whisky-grants',
        name: 'Whisky Black & White 700ml',
        price: 162.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190304_1is55ds9af3.jpg',
        category: 'Whisky',
        volume: 'Garrafa 700ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'whisky-grants',
        name: 'Whisky Chanceler Garrafa 1l',
        price: 75.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190158_74cjk1bb6jq.jpg',
        category: 'Whisky',
        volume: 'Garrafa 1l',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'whisky-grants',
        name: 'Whisky Escocês Passport Scotch 1l',
        price: 137.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202502141304_qs63aj60e9a.jpeg',
        category: 'Whisky',
        volume: 'Garrafa 1l',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'whisky-grants',
        name: 'Whisky Finest Ballantines 750ml',
        price: 172.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210202242_hlj5qwgjoh9.jpg',
        category: 'Whisky',
        volume: 'Garrafa 750ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'whisky-grants',
        name: 'Whisky Johnnie Walker Red Label Garrafa 1 Litro',
        price: 249.75,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210180410_2hnui47v0mx.jpg',
        category: 'Whisky',
        volume: 'Garrafa 1l',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'whisky-grants',
        name: 'Whisky White Horse 500ml',
        price: 97.25,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202301251147_bn3iotc9i9.jpg',
        category: 'Whisky',
        volume: 'Garrafa 500ml',
        inStock: true,
        isAlcoholic: true
      },
      {
        id: 'whisky-bells',
        name: 'Whisky Grants Family Reserve Scotch Whiskey 8 Anos Garrafa 1l',
        price: 131.78,
        originalPrice: 150.00,
        description: 'Produto para maiores de 18 anos',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210182302_5lhqdht6z49.jpg',
        category: 'Whisky',
        volume: 'Garrafa 1l',
        inStock: true,
        isAlcoholic: true
      }
    ]
  }
];

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('tabacaria');
  const searchQuery = useSearchStore(state => state.query);

  const allCategories = useMemo(() => {
    const allProducts = productCategories.flatMap(category => category.products);
    return [
      ...productCategories,
      {
        id: 'todos',
        name: 'Todos',
        products: allProducts
      }
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    const categoryProducts = allCategories.find(cat => cat.id === selectedCategory)?.products || [];
    
    if (!searchQuery) return categoryProducts;

    const normalizedQuery = searchQuery.toLowerCase().trim();
    return categoryProducts.filter(product => {
      const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [selectedCategory, searchQuery, allCategories]);

  if (searchQuery && filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Nenhum produto encontrado</h2>
        <p className="text-gray-300">
          Não encontramos produtos correspondentes à sua busca: "{searchQuery}"
        </p>
      </div>
    );
  }

  return (
    <div>
      <section className="my-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold text-red-900 mb-12 text-center">
          Bem-vindo à Adega Rádio Tatuapé FM
        </h1>
        <div className="bg-red-900 text-white rounded-xl shadow-lg p-12 mb-20 text-center">
          <h2 className="text-4xl font-bold mb-8">🌟 Entrega 24 Horas!</h2>
          <p className="text-2xl font-medium">
            As melhores bebidas da região com entrega em toda São Paulo.
          </p>
        </div>
      </section>

      <section>
        <div className="flex overflow-x-auto pb-4 mb-6 gap-4">
          {allCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-red-900 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-60 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={`w-full h-full ${product.isTabacco ? 'object-contain p-4 bg-white' : 'object-cover'} transform hover:scale-105 transition-transform duration-300`}
                />
                {!product.inStock && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg">
                    Esgotado
                  </div>
                )}
                {product.temperature === 'gelada' && (
                  <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-br-lg">
                    Gelada
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                {product.volume && (
                  <p className="text-sm text-gray-500 mb-4">{product.volume}</p>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    {!product.isTabacco && (
                      <>
                        <span className="text-2xl font-bold text-red-900">
                          R$ {product.price?.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </>
                    )}
                    {product.isTabacco && (
                      <span className="text-xl font-bold text-green-600">
                        Consultar preço
                      </span>
                    )}
                  </div>
                  <a
                    href={product.isTabacco 
                      ? `https://wa.me/5511970603441?text=${encodeURIComponent('Quero pedir produto de tabacaria: ' + product.name)}`
                      : "https://www.ifood.com.br/delivery/sao-paulo-sp/adega-radio-tatuape-fm-24-horas-vila-regente-feijo/29aa6191-cf23-4569-a8c3-d7bd66d877b5"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg transition inline-block text-center ${
                      product.inStock
                        ? product.isTabacco 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-red-900 text-white hover:bg-red-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {!product.inStock 
                      ? 'Esgotado' 
                      : product.isTabacco 
                        ? 'Pedir pelo WhatsApp' 
                        : 'Pedir no iFood'
                    }
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
