-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 03-Dez-2019 às 15:51
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistemaacg`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `anexo`
--

CREATE TABLE `anexo` (
  `id_anexo` bigint(20) NOT NULL,
  `caminho` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `doc_id_doc_necessario` bigint(20) DEFAULT NULL,
  `solicitacao_id_solicitacao` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `atividade`
--

CREATE TABLE `atividade` (
  `id_atividade` bigint(20) NOT NULL,
  `carga_horaria` bigint(20) NOT NULL,
  `descricao` varchar(250) DEFAULT NULL,
  `detalhamento` varchar(255) DEFAULT NULL,
  `precisa_calcular` bit(1) NOT NULL,
  `grupo_id_grupo` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `atividade`
--

INSERT INTO `atividade` (`id_atividade`, `carga_horaria`, `descricao`, `detalhamento`, `precisa_calcular`, `grupo_id_grupo`) VALUES
(1, 1, 'Componentes curriculares da UNIPAMPA ou de outras IES aprovadas pela comissão de curso', 'A cada 1h comprovada', b'1', 1),
(2, 1, 'Cursos na área de interesse em função do perfil do egresso', 'A cada 1h comprovada', b'1', 1),
(3, 1, 'Cursos de língua brasileira de sinais', 'A cada 1h comprovada', b'1', 1),
(4, 2, 'Cursos de língua estrangeira inglês', 'A cada 1h comprovada', b'1', 1),
(5, 1, 'Cursos de língua estrangeira, exceto inglês', 'A cada 1h comprovada', b'1', 1),
(6, 40, 'Aprovação em exame de proficiência em língua brasileira de sinais', '', b'0', 1),
(7, 40, 'Aprovação em exame de proficiência em língua estrangeira', '', b'0', 1),
(8, 1, 'Monitorias em componentes curriculares na UNIPAMPA', 'A cada 1h comprovada', b'1', 1),
(9, 1, 'Participação em projeto de ensino na UNIPAMPAComo equipe executora', 'A cada 1h comprovada', b'1', 1),
(10, 1, 'Participação em projeto de ensino na UNIPAMPAComo público-alvo', 'A cada 1h comprovada', b'1', 1),
(11, 1, 'Participação em projeto de ensino em outras IESComo equipe executora', 'A cada 1h comprovada', b'1', 1),
(12, 1, 'Participação em projeto de ensino em outras IESComo público-alvo', 'A cada 1h comprovada', b'1', 1),
(13, 1, 'Estágio não obrigatório ligado a atividades de ensino', 'A cada 1h comprovada', b'1', 1),
(14, 1, 'Organização de eventos de ensino', 'A cada 1h comprovada', b'1', 1),
(15, 50, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoEvento com qualis A1', '', b'0', 1),
(16, 40, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoEvento com qualis A2', '', b'0', 1),
(17, 30, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoEvento com qualis B1', '', b'0', 1),
(18, 20, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoEvento com qualis B2 ou B3', '', b'0', 1),
(19, 15, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoEvento com qualis B4 ou B5', '', b'0', 1),
(20, 10, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoEvento com qualis C ou sem qualis', '', b'0', 1),
(21, 80, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoLivro (com corpo editorial)', '', b'0', 1),
(22, 20, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoCapítulo de livro (com corpo editorial)', '', b'0', 1),
(23, 50, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoPublicação com qualis A1', 'Para periódicos a quantidade de horas é dobrada', b'0', 1),
(24, 40, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoPublicação com qualis A2', 'Para periódicos a quantidade de horas é dobrada', b'0', 1),
(25, 30, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoPublicação com qualis B1', 'Para periódicos a quantidade de horas é dobrada', b'0', 1),
(26, 20, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoPublicação com qualis B2 ou B3', 'Para periódicos a quantidade de horas é dobrada', b'0', 1),
(27, 15, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoPublicação com qualis B4 ou B5', 'Para periódicos a quantidade de horas é dobrada', b'0', 1),
(28, 10, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoPublicação com qualis C ou sem qualis', 'Para periódicos a quantidade de horas é dobrada', b'0', 1),
(29, 1, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de ensinoDemais produções', '', b'0', 1),
(30, 50, 'Apresentação de trabalho em eventos de ensinoEvento com qualis A1', '', b'0', 1),
(31, 40, 'Apresentação de trabalho em eventos de ensinoEvento com qualis A2', '', b'0', 1),
(32, 30, 'Apresentação de trabalho em eventos de ensinoEvento com qualis B1', '', b'0', 1),
(33, 20, 'Apresentação de trabalho em eventos de ensino;', '', b'0', 1),
(34, 15, 'Apresentação de trabalho em eventos de ensinoEvento com qualis B4 ou B5', '', b'0', 1),
(35, 10, 'Apresentação de trabalho em eventos de ensinoEvento com qualis C ou sem qualis', '', b'0', 1),
(36, 5, 'Participação como OUVINTE em eventos de ensino, pesquisaEvento com qualis A1', 'A cada 1h comprovada', b'1', 1),
(37, 4, 'Participação como OUVINTE em eventos de ensino, pesquisaEvento com qualis A2', 'A cada 1h comprovada', b'1', 1),
(38, 3, 'Participação como OUVINTE em eventos de ensino, pesquisaEvento com qualis B1', 'A cada 1h comprovada', b'1', 1),
(39, 2, 'Participação como OUVINTE em eventos de ensino, pesquisaEvento com qualis B2 ou B3', 'A cada 1h comprovada', b'1', 1),
(40, 1, 'Participação como OUVINTE em eventos de ensino, pesquisaEvento com qualis B4 ou B5', 'A cada 1h comprovada', b'1', 1),
(41, 1, 'Participação como OUVINTE em eventos de ensino, pesquisaEvento com qualis C ou sem qualis', 'A cada 1h comprovada', b'1', 1),
(42, 5, 'Participação como OUVINTE em eventos de extensão, inovação e empreendedorismoInternacional', 'A cada 1h comprovada', b'1', 1),
(43, 3, 'Participação como OUVINTE em eventos de extensão, inovação e empreendedorismoNacional', 'A cada 1h comprovada', b'1', 1),
(44, 1, 'Participação como OUVINTE em eventos de extensão, inovação e empreendedorismoRegional (ex.: SIEPE)', 'A cada 1h comprovada', b'1', 1),
(45, 1, 'Participação como OUVINTE em eventos de extensão, inovação e empreendedorismoLocal', 'A cada 1h comprovada', b'1', 1),
(46, 10, 'Realização de palestra fora de evento de acordo com perfil de egresso', '', b'0', 1),
(47, 2, 'Participação em competições na área de interesse em função do perfil do egresso', 'A cada 1h comprovada', b'1', 1),
(48, 1, 'Visitas técnicas institucionais na área de interesse em função do perfil do egresso', 'A cada 1h comprovada', b'1', 1),
(49, 12, 'Participação no POSCOMP com Desempenho igual ou superior à média nacional do ano de realização da prova', '', b'0', 1),
(50, 4, 'Participação no POSCOMP com Desempenho inferior à média nacional do ano de realização da prova', '', b'0', 1),
(51, 1, 'Participação em projeto de pesquisa na UNIPAMPAComo equipe executora', 'A cada 1h comprovada', b'1', 2),
(52, 1, 'Participação em projeto de pesquisa na UNIPAMPAComo público-alvo', 'A cada 1h comprovada', b'1', 2),
(53, 1, 'Participação em projeto de pesquisa em outras IESComo equipe executora', 'A cada 1h comprovada', b'1', 2),
(54, 1, 'Participação em projeto de pesquisa em outras IESComo público-alvo', 'A cada 1h comprovada', b'1', 2),
(55, 1, 'Participação em projeto de centro de pesquisa ou espaço de pesquisa reconhecidoComo equipe executora', 'A cada 1h comprovada', b'1', 2),
(56, 1, 'Participação em projeto de centro de pesquisa ou espaço de pesquisa reconhecidoComo público-alvo', 'A cada 1h comprovada', b'1', 2),
(57, 80, 'Publicação acadêmica de pesquisa em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaLivro (com corpo editorial)', '', b'0', 2),
(59, 50, 'Publicação acadêmica de pesquisa em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaPublicação com qualis A1', 'Para periódicos a quantidade de horas é dobrada', b'0', 2),
(60, 40, 'Publicação acadêmica de pesquisa em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaPublicação com qualis A2', 'Para periódicos a quantidade de horas é dobrada', b'0', 2),
(61, 30, 'Publicação acadêmica de pesquisa em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaPublicação com qualis B1', 'Para periódicos a quantidade de horas é dobrada', b'0', 2),
(62, 20, 'Publicação acadêmica de pesquisa em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaPublicação com qualis B2 ou B3', 'Para periódicos a quantidade de horas é dobrada', b'0', 2),
(63, 15, 'Publicação acadêmica de pesquisa em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaPublicação com qualis B4 ou B5', 'Para periódicos a quantidade de horas é dobrada', b'0', 2),
(64, 10, 'Publicação acadêmica de pesquisa em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaPublicação com qualis C ou sem qualis', 'Para periódicos a quantidade de horas é dobrada', b'0', 2),
(65, 1, 'Publicação acadêmica de pesquisa em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaDemais produções', '', b'0', 2),
(66, 1, 'Organização de eventos de pesquisa', 'A cada 1h comprovada', b'1', 2),
(67, 50, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de pesquisaEvento com qualis A1', '', b'0', 2),
(68, 40, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de pesquisaEvento com qualis A2', '', b'0', 2),
(69, 30, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de pesquisaEvento com qualis B1', '', b'0', 2),
(70, 20, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de pesquisaEvento com qualis B2 ou B3', '', b'0', 2),
(71, 15, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de pesquisaEvento com qualis B4 ou B5', '', b'0', 2),
(72, 10, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de pesquisaEvento com qualis C ou sem qualis', '', b'0', 2),
(73, 50, 'Apresentação de trabalho em eventos de pesquisaEvento com qualis A1', '', b'0', 2),
(74, 40, 'Apresentação de trabalho em eventos de pesquisaEvento com qualis A2', '', b'0', 2),
(75, 30, 'Apresentação de trabalho em eventos de pesquisaEvento com qualis B1', '', b'0', 2),
(76, 20, 'Apresentação de trabalho em eventos de pesquisaEvento com qualis B2 ou B3', '', b'0', 2),
(77, 15, 'Apresentação de trabalho em eventos de pesquisaEvento com qualis B4 ou B5', '', b'0', 2),
(78, 10, 'Apresentação de trabalho em eventos de pesquisaEvento com qualis C ou sem qualis', '', b'0', 2),
(79, 1, 'Estágio não obrigatório ligado a atividades de pesquisa', 'A cada 1h comprovada', b'1', 2),
(80, 1, 'Participação em projeto ou atividade de extensão na UNIPAMPAComo equipe executora', 'A cada 1h comprovada', b'1', 3),
(81, 1, 'Participação em projeto ou atividade de extensão na UNIPAMPAComo público-alvo', 'A cada 1h comprovada', b'1', 3),
(82, 1, 'Participação em projeto ou atividade de extensão em outras IESComo equipe executora', 'A cada 1h comprovada', b'1', 3),
(83, 1, 'Participação em projeto ou atividade de extensão em outras IESComo público-alvo', 'A cada 1h comprovada', b'1', 3),
(84, 80, 'Publicação acadêmica de extensão em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaLivro (com corpo editorial)', '', b'0', 3),
(85, 20, 'Publicação acadêmica de extensão em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaCapítulo de livro (com corpo editorial)', '', b'0', 3),
(86, 50, 'Publicação acadêmica de extensão em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaInternacional', 'Para periódicos a quantidade de horas é dobrada', b'0', 3),
(87, 30, 'Publicação acadêmica de extensão em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaNacional', 'Para periódicos a quantidade de horas é dobrada', b'0', 3),
(88, 15, 'Publicação acadêmica de extensão em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaRegional (ex.: SIEPE)', 'Para periódicos a quantidade de horas é dobrada', b'0', 3),
(89, 10, 'Publicação acadêmica de extensão em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaLocal', 'Para periódicos a quantidade de horas é dobrada', b'0', 3),
(90, 1, 'Publicação acadêmica de extensão em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaDemais produções', '', b'0', 3),
(91, 1, 'Organização de eventos de extensão', 'A cada 1h comprovada', b'1', 3),
(92, 50, 'Apresentação de trabalho em eventos de extensãoInternacional', '', b'0', 3),
(93, 30, 'Apresentação de trabalho em eventos de extensãoNacional', '', b'0', 3),
(94, 15, 'Apresentação de trabalho em eventos de extensãoRegional (ex.: SIEPE)', '', b'0', 3),
(95, 10, 'Apresentação de trabalho em eventos de extensãoLocal', '', b'0', 3),
(96, 50, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de extensãoInternacional', '', b'0', 3),
(97, 30, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de extensãoNacional', '', b'0', 3),
(98, 15, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de extensãoRegional (ex.: SIEPE)', '', b'0', 3),
(99, 10, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de extensãoLocal', '', b'0', 3),
(100, 1, 'Estágio não obrigatório ligado a atividades de extensão', 'A cada 1h comprovada', b'1', 3),
(101, 1, 'Participação em projeto de cunho desportivo, cultural, social ou artístico na UNIPAMPAComo equipe executora', 'A cada 1h comprovada', b'1', 4),
(102, 1, 'Participação em projeto de cunho desportivo, cultural, social ou artístico na UNIPAMPAComo público-alvo', 'A cada 1h comprovada', b'1', 4),
(103, 1, 'Participação em projeto de cunho desportivo, cultural, social ou artístico em instituições ou organizaçõesComo equipe executora', 'A cada 1h comprovada', b'1', 4),
(104, 1, 'Como público-alvo', 'A cada 1h comprovada', b'1', 4),
(105, 1, 'Participação como OUVINTE ou ESPECTADOR em atividade de cunho desportivo, cultural, social ou artístico', 'A cada 1h comprovada', b'1', 4),
(106, 5, 'Premiação referente a atividade de cunho desportivo, cultural, social ou artístico', '', b'0', 4),
(107, 1, 'Organização de campanhas beneficentes, educativas e ambientais', 'A cada 1h comprovada', b'1', 4),
(108, 2, 'Participação como COMPETIDOR, AUTOR ou PRODUTOR em atividade de cunho desportivo, cultural, social ou artístico', 'A cada 1h comprovada', b'1', 4),
(109, 10, 'Premiação referente ao desempenho acadêmico ou a atividades de ensino, pesquisa, extensão, inovação e empreendedorismo', '', b'1', 4),
(110, 20, 'Representação discente em órgãos colegiados e comissões institucionais da Unipampa', 'por semestre*', b'1', 4),
(111, 20, 'Representação discente em órgãos oficiais de representação estudantil', 'por semestre*', b'1', 4),
(112, 20, 'Representação discente institucional em relação a sociedades e conselhos profissionais', 'por semestre*', b'1', 4),
(113, 1, 'Participação em projeto de gestão administrativa ou gestão acadêmica na UNIPAMPAComo equipe executora', 'A cada 1h comprovada', b'1', 4),
(114, 1, 'Participação em projeto de gestão administrativa ou gestão acadêmica na UNIPAMPAComo público-alvo', 'A cada 1h comprovada', b'1', 4),
(115, 1, 'Participação em projeto de gestão administrativa ou gestão acadêmica em outras IESComo equipe executora', 'A cada 1h comprovada', b'1', 4),
(116, 1, 'Participação em projeto de gestão administrativa ou gestão acadêmica em outras IESComo público-alvo', 'A cada 1h comprovada', b'1', 4),
(117, 1, 'Trabalho voluntário ligado a atividades desportivas, sociais, culturais, artísticas, gestão administrativa e gestão acadêmica', 'A cada 1h comprovada', b'1', 4),
(118, 1, 'Participação em empresas júniores de iniciação ao trabalho técnico-profissional', 'A cada 1h comprovada', b'1', 4),
(119, 1, 'Estágio não obrigatório ligado a atividades desportivas, culturais, sociais, artísticas, gestão administrativa, gestão acadêmica', 'A cada 1h comprovada', b'1', 4),
(120, 1, 'Estágio não obrigatório de iniciação ao trabalho técnico-profissional em função do perfil do egresso', 'A cada 1h comprovada', b'1', 4),
(121, 1, 'Estágio não obrigatório ligado a empresas júniores de iniciação ao trabalho técnico-profissional', 'A cada 1h comprovada', b'1', 4),
(122, 1, 'Estágio não obrigatório ligado a atividades de inovação e empreendedorismo', 'A cada 1h comprovada', b'1', 4),
(123, 80, 'Publicação acadêmica de inovação e empreendedorismo em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaLivro (com corpo editorial)', '', b'0', 4),
(124, 20, 'Publicação acadêmica de inovação e empreendedorismo em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaCapítulo de livro (com corpo editorial)', '', b'0', 4),
(125, 50, 'Publicação acadêmica de inovação e empreendedorismo em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaInternacional', 'Para periódicos a quantidade de horas é dobrada', b'0', 4),
(126, 30, 'Publicação acadêmica de inovação e empreendedorismo em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaNacional', 'Para periódicos a quantidade de horas é dobrada', b'0', 4),
(127, 15, 'Publicação acadêmica de inovação e empreendedorismo em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaRegional', 'Para periódicos a quantidade de horas é dobrada', b'0', 4),
(128, 10, 'Publicação acadêmica de inovação e empreendedorismo em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaLocal', 'Para periódicos a quantidade de horas é dobrada', b'0', 4),
(129, 1, 'Publicação acadêmica de inovação e empreendedorismo em evento especializado, periódico especializado (revistas, jornais, etc.) ou na forma de livros, capítulos de livros ou outra produção bibliográficaDemais produções', '', b'0', 4),
(130, 1, 'Organização de eventos de inovação e empreendedorismo', 'A cada 1h comprovada', b'1', 4),
(131, 50, 'Apresentação de trabalho em eventos de inovação e empreendedorismoInternacional', '', b'0', 4),
(132, 30, 'Apresentação de trabalho em eventos de inovação e empreendedorismoNacional', '', b'0', 4),
(133, 15, 'Apresentação de trabalho em eventos de inovação e empreendedorismoRegional', '', b'0', 4),
(134, 10, 'Apresentação de trabalho em eventos de inovação e empreendedorismoLocal', '', b'0', 4),
(135, 50, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de inovação e empreendedorismoInternacional', '', b'0', 4),
(136, 30, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de inovação e empreendedorismoNacional', '', b'0', 4),
(137, 15, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de inovação e empreendedorismoRegional', '', b'0', 4),
(138, 10, 'Participação na condição de palestrante, painelista, debatedor ou oficineiro em eventos de inovação e empreendedorismoLocal', '', b'0', 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `atividade_has_doc`
--

CREATE TABLE `atividade_has_doc` (
  `id_atividade` bigint(20) NOT NULL,
  `id_doc_necessario` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `atividade_has_doc`
--

INSERT INTO `atividade_has_doc` (`id_atividade`, `id_doc_necessario`) VALUES
(1, 4),
(1, 2),
(1, 1),
(2, 4),
(2, 29),
(2, 5),
(3, 3),
(3, 29),
(3, 5),
(4, 29),
(4, 5),
(4, 3),
(5, 29),
(5, 5),
(5, 3),
(6, 6),
(7, 6),
(8, 4),
(8, 9),
(8, 30),
(9, 4),
(9, 9),
(9, 30),
(10, 4),
(10, 31),
(11, 4),
(11, 9),
(11, 11),
(12, 4),
(12, 12),
(11, 4),
(11, 9),
(11, 11),
(12, 4),
(12, 12),
(13, 12),
(13, 13),
(14, 4),
(14, 14),
(15, 15),
(16, 15),
(17, 15),
(18, 15),
(19, 15),
(20, 15),
(21, 16),
(22, 16),
(23, 17),
(23, 18),
(24, 17),
(24, 18),
(25, 17),
(25, 18),
(26, 17),
(26, 18),
(27, 17),
(27, 18),
(28, 17),
(28, 18),
(29, 17),
(29, 18),
(30, 24),
(31, 24),
(32, 24),
(33, 24),
(34, 24),
(35, 24),
(36, 4),
(36, 31),
(37, 4),
(37, 31),
(38, 4),
(38, 31),
(39, 4),
(39, 31),
(40, 4),
(40, 31),
(41, 4),
(41, 31),
(42, 4),
(42, 31),
(43, 4),
(43, 31),
(44, 4),
(44, 31),
(45, 4),
(45, 31),
(46, 24),
(47, 31),
(47, 4),
(48, 32),
(49, 33),
(50, 33),
(51, 4),
(51, 2),
(51, 1),
(52, 31),
(52, 4),
(53, 9),
(53, 4),
(53, 11),
(54, 4),
(54, 31),
(55, 9),
(55, 4),
(55, 11),
(56, 4),
(56, 31),
(57, 16),
(58, 16),
(59, 18),
(59, 17),
(60, 18),
(60, 17),
(61, 18),
(61, 17),
(62, 18),
(62, 17),
(63, 18),
(63, 17),
(64, 18),
(64, 17),
(65, 18),
(65, 17),
(66, 14),
(66, 4),
(67, 4),
(67, 22),
(67, 23),
(68, 4),
(68, 22),
(68, 23),
(69, 4),
(69, 22),
(69, 23),
(70, 4),
(70, 22),
(70, 23),
(71, 4),
(71, 22),
(71, 23),
(71, 4),
(72, 22),
(72, 23),
(73, 24),
(74, 24),
(75, 24),
(76, 24),
(77, 24),
(78, 24),
(79, 12),
(79, 13),
(80, 4),
(80, 2),
(80, 1),
(81, 31),
(81, 4),
(82, 4),
(82, 9),
(82, 11),
(82, 4),
(83, 31),
(84, 16),
(85, 16),
(86, 18),
(86, 17),
(87, 18),
(87, 17),
(88, 18),
(88, 17),
(89, 18),
(89, 17),
(90, 18),
(90, 17),
(91, 4),
(91, 14),
(92, 24),
(93, 24),
(94, 24),
(95, 24),
(96, 4),
(96, 23),
(96, 22),
(97, 4),
(97, 23),
(97, 22),
(98, 4),
(98, 23),
(98, 22),
(99, 4),
(99, 23),
(99, 22),
(100, 12),
(100, 13),
(101, 4),
(101, 2),
(101, 1),
(102, 31),
(102, 4),
(103, 9),
(103, 4),
(103, 11),
(104, 4),
(104, 31),
(105, 9),
(105, 4),
(105, 11),
(106, 4),
(106, 31),
(107, 4),
(107, 14),
(108, 4),
(108, 23),
(108, 22),
(109, 27),
(110, 28),
(111, 28),
(112, 28),
(113, 4),
(113, 2),
(113, 1),
(114, 4),
(114, 29),
(115, 4),
(115, 9),
(115, 11),
(116, 4),
(116, 31),
(117, 4),
(117, 9),
(118, 4),
(118, 9),
(119, 23),
(119, 22),
(120, 23),
(120, 22),
(121, 23),
(121, 22),
(122, 23),
(122, 22),
(123, 16),
(124, 16),
(125, 18),
(125, 17),
(126, 18),
(126, 17),
(127, 18),
(127, 17),
(128, 18),
(128, 17),
(129, 18),
(129, 17),
(130, 4),
(130, 14),
(131, 24),
(132, 24),
(133, 24),
(134, 24),
(135, 24),
(136, 4),
(136, 23),
(136, 22),
(137, 4),
(137, 23),
(137, 22),
(138, 4),
(138, 23),
(138, 22);

-- --------------------------------------------------------

--
-- Estrutura da tabela `avaliacao_solicitacao`
--

CREATE TABLE `avaliacao_solicitacao` (
  `id_avaliacao` bigint(20) NOT NULL,
  `carga_horaria_atribuida` bigint(20) NOT NULL,
  `data_avaliacao` datetime DEFAULT NULL,
  `justificativa` varchar(255) DEFAULT NULL,
  `precisou_de_correcao` bit(1) NOT NULL,
  `solicitacao_id_solicitacao` bigint(20) NOT NULL,
  `solicitada_id_atividade` bigint(20) DEFAULT NULL,
  `solicitado_id_grupo` bigint(20) DEFAULT NULL,
  `nome_coordenador` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `curriculo`
--

CREATE TABLE `curriculo` (
  `id_curriculo` bigint(20) NOT NULL,
  `ano` int(11) NOT NULL,
  `status` bit(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `curriculo`
--

INSERT INTO `curriculo` (`id_curriculo`, `ano`, `status`) VALUES
(1, 2011, b'1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `docs_necessarios`
--

CREATE TABLE `docs_necessarios` (
  `id_doc_necessario` bigint(20) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `docs_necessarios`
--

INSERT INTO `docs_necessarios` (`id_doc_necessario`, `nome`) VALUES
(1, 'Extrato da ata da comissão de curso'),
(2, 'Comprovante de aprovação'),
(3, 'Comprovante de frequência'),
(4, 'Comprovante de carga horária'),
(5, 'Comprovante de conteúdo programático'),
(6, 'Comprovante de proficiência'),
(7, 'Certificado de monitoria emitido pela Unipampa'),
(8, 'Código de registro no SIPPEE'),
(9, 'Relatório de atividades'),
(10, 'Comprovante de participação'),
(11, 'Cópia do projeto'),
(12, 'Termo de compromisso de estágio'),
(13, 'Termo de realização de estágio'),
(14, 'Comprovante de participação como organizador'),
(15, 'Comprovante de participação com natureza explícita'),
(16, 'Cópia da ficha catalográfica'),
(17, 'Aceite para publicação'),
(18, 'Cópia da publicação'),
(19, 'Cópia da ficha catalográfica'),
(20, 'Certificado de participação emitido pela Unipampa'),
(21, 'Comprovante de participação como organizador'),
(22, 'Conteúdo da atividade'),
(23, 'Comprovante de participação com natureza explícita do tipo de participação'),
(24, 'Comprovante de apresentação'),
(25, 'Certificado de participação emitido pela Unipampa'),
(26, 'Comprovante de apresentação'),
(27, 'Comprovante de premiação'),
(28, 'Comprovante do período de representação'),
(29, 'Comprovante de aprovação ou frequência'),
(30, 'Certificado de monitoria emitido pela Unipampa OU Código de registro no SIPPEE'),
(31, 'Comprovante de (i) participação ou frequência'),
(32, 'Relatório de viagem'),
(33, 'Comprovante de desempenho'),
(34, 'Certificado de participação emitido pela Unipampa OU Código de registro no SIPPEE');

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo`
--

CREATE TABLE `grupo` (
  `id_grupo` bigint(20) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `curriculo_id_curriculo` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `grupo`
--

INSERT INTO `grupo` (`id_grupo`, `nome`, `curriculo_id_curriculo`) VALUES
(1, 'Atividades de Ensino', 1),
(2, 'Atividades de Pesquisa', 1),
(3, 'Atividades de Extensão', 1),
(4, 'Atividades Culturais e Artísticas, Sociais e de Gestão', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(1),
(1),
(1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `solicitacao`
--

CREATE TABLE `solicitacao` (
  `id_solicitacao` bigint(20) NOT NULL,
  `carga_horaria_soli` bigint(20) NOT NULL,
  `data_atual` datetime DEFAULT NULL,
  `data_fim` datetime NOT NULL,
  `data_inicio` datetime NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `local` varchar(255) DEFAULT NULL,
  `matricula` bigint(20) NOT NULL,
  `nome_aluno` varchar(255) DEFAULT NULL,
  `prof_res` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `atividade_id_atividade` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anexo`
--
ALTER TABLE `anexo`
  ADD PRIMARY KEY (`id_anexo`),
  ADD KEY `FK1q3pbteeym6uc1ncjv474m10d` (`doc_id_doc_necessario`),
  ADD KEY `FK5e1f9ufdg92ak6gm9ynrgcjvb` (`solicitacao_id_solicitacao`);

--
-- Indexes for table `atividade`
--
ALTER TABLE `atividade`
  ADD PRIMARY KEY (`id_atividade`),
  ADD KEY `FK90unoh6v5285wyaq5hmi1gc75` (`grupo_id_grupo`);

--
-- Indexes for table `atividade_has_doc`
--
ALTER TABLE `atividade_has_doc`
  ADD KEY `FK2r43jhjuv9q78e8377l2jmh1d` (`id_doc_necessario`),
  ADD KEY `FK3xcba7k1u8b9tu08jsu97ia1x` (`id_atividade`);

--
-- Indexes for table `avaliacao_solicitacao`
--
ALTER TABLE `avaliacao_solicitacao`
  ADD PRIMARY KEY (`id_avaliacao`),
  ADD KEY `FKervoxq8sgt2hk9ihfthnool3x` (`solicitacao_id_solicitacao`),
  ADD KEY `FKcpmhbwvuhuudaw4j8eo0up1r5` (`solicitada_id_atividade`),
  ADD KEY `FK3ed8g4jgfq2hv63n1hd5b1n4l` (`solicitado_id_grupo`);

--
-- Indexes for table `curriculo`
--
ALTER TABLE `curriculo`
  ADD PRIMARY KEY (`id_curriculo`);

--
-- Indexes for table `docs_necessarios`
--
ALTER TABLE `docs_necessarios`
  ADD PRIMARY KEY (`id_doc_necessario`);

--
-- Indexes for table `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id_grupo`),
  ADD KEY `FKalggjeqfhyxxu20801e7qty80` (`curriculo_id_curriculo`);

--
-- Indexes for table `solicitacao`
--
ALTER TABLE `solicitacao`
  ADD PRIMARY KEY (`id_solicitacao`),
  ADD KEY `FK179cigrk16yuerl3md7yqvq27` (`atividade_id_atividade`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anexo`
--
ALTER TABLE `anexo`
  MODIFY `id_anexo` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `avaliacao_solicitacao`
--
ALTER TABLE `avaliacao_solicitacao`
  MODIFY `id_avaliacao` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id_grupo` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `solicitacao`
--
ALTER TABLE `solicitacao`
  MODIFY `id_solicitacao` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
