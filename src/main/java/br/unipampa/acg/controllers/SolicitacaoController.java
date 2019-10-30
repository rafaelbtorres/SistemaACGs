/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.unipampa.acg.controllers;

import br.unipampa.acg.dao.AtividadeDao;
import br.unipampa.acg.dao.CurriculoDao;
import br.unipampa.acg.dao.GrupoDao;
import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import br.unipampa.acg.dao.SolicitacaoDao;
import br.unipampa.acg.dao.Solicitacoes;
import br.unipampa.acg.domain.Anexo;
import br.unipampa.acg.domain.Atividade;
import br.unipampa.acg.domain.Curriculo;
import br.unipampa.acg.domain.Grupo;
import br.unipampa.acg.domain.Solicitacao;
import br.unipampa.acg.utils.View;

import java.sql.Array;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.NClob;
import java.sql.PreparedStatement;
import java.sql.SQLClientInfoException;
import java.sql.SQLException;
import java.sql.SQLWarning;
import java.sql.SQLXML;
import java.sql.Savepoint;
import java.sql.Statement;
import java.sql.Struct;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.concurrent.Executor;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestParam;

//import br.unipampa.acg.upload.AnexoService;
/**
 *
 * @author
 */
@RestController

public class SolicitacaoController {

    private Anexo anexo;
    // private final AnexoService anexoService;

    // @Autowired
    // public SolicitacaoController(AnexoService anexoService) {
    // this.anexoService = anexoService;
    // }
    @ResponseBody
    @GetMapping("/acg/todassolicitacoes")
    public ResponseEntity buscaTodasSolicitacoes() {

        SolicitacaoDao dao = new SolicitacaoDao();

        List<Solicitacao> s = dao.loadAllData(Solicitacao.class);

        // String json = "[";
        //
        // for (int i = 0; i < s.size(); i++) {
        // Solicitacao sol = s.get(i);
        // json = json + s.get(i).toString();
        // if (i != s.size() - 1) {
        // json = json + ",";
        // }
        // }
        // json = json + "]";
        // String.valueOf(s.size());
        dao.close();

        return ResponseEntity.ok(s);
    }

    @ResponseBody
    @PostMapping("/solicitacao")
    @JsonView(View.Standard.class)
    public ResponseEntity adicionarSolicitacao(@Valid @RequestBody Solicitacao acg) {
        SolicitacaoDao dao = new SolicitacaoDao();
        Random idRandom = new Random();
        acg.setIdsolicitacao(idRandom.nextLong());
        dao.persist(acg);
        dao.close();
        return ResponseEntity.ok(acg);
    }

    @ResponseBody
    @GetMapping("/acg/{id}/solicitacaoporid")
    public ResponseEntity buscaSolicitacaoPorId(@PathVariable("id") long id) {

        SolicitacaoDao dao = new SolicitacaoDao();
        Solicitacao s = dao.load(Solicitacao.class, id);
        String a = s.toString();
        dao.close();

        return ResponseEntity.ok(a);
    }

    @ResponseBody
    @GetMapping("/acg/{id}/buscaatividade")
    public ResponseEntity buscaAtividade(@PathVariable("id") long id) {

        AtividadeDao dao = new AtividadeDao();
        Atividade s = dao.load(Atividade.class, id);
        String a = s.toString();
        dao.close();

        return ResponseEntity.ok(a);
    }

    // @ResponseBody
    // @GetMapping("/acg/{id}/grupo")
    // public ResponseEntity buscaGrupo(@PathVariable("id") long id) {
    //
    // GrupoDao dao = new GrupoDao();
    // Grupo s = dao.load(Grupo.class, id);
    // String a = s.toString();
    // dao.close();
    //
    // return ResponseEntity.ok(a);
    // }
    // @ResponseBody
    // @GetMapping("/acg/{id}/curriculo")
    // public ResponseEntity buscaCurriculo(@PathVariable("id") long id) {
    //
    // CurriculoDao dao = new CurriculoDao();
    // Curriculo s = dao.load(Curriculo.class, id);
    // String a = s.toString();
    // dao.close();
    //
    // return ResponseEntity.ok(a);
    // }

    @ResponseBody
    @DeleteMapping("/solicitacao/{id}")
    public ResponseEntity excluirSolicitacao(@PathVariable("id") int id) {
        SolicitacaoDao dao = new SolicitacaoDao(); // ... Abre sessão com o banco.
        Solicitacao sv = dao.load(Solicitacao.class, id); // ... Carrega configuração.
        dao.delete(sv); // ... Salva a config. com PID.
        dao.close(); // ... Fecha sessão com o banco.
        return ResponseEntity.ok("");
    }

    // @ResponseBody
    // @PostMapping("/acg_anexo/")
    // @JsonView(View.Standard.class)
    // public ResponseEntity salvarComAnexo(@Valid @RequestBody Solicitacao acg,
    // @RequestParam MultipartFile arquivoAnexo) {
    // anexo = new Anexo("anexo");
    // String caminho = anexo.salvarAnexo(arquivoAnexo);
    // acg.setNomeAnexo(caminho);
    // SolicitacaoDao dao = new SolicitacaoDao();
    // dao.persist(acg);
    // dao.close();
    // return ResponseEntity.ok(acg);
    // }
    // Editar
    // @ResponseBody
    // @GetMapping("/acg/{id}/edit")
    // public Solicitacao editarSolicitacao(@PathVariable("idsolicitacao") long id)
    // {
    // Solicitacao dados = new Solicitacao();
    // SolicitacaoDao dao = new SolicitacaoDao();
    // dados = dao.load(Solicitacao.class, id);
    // dao.close();
    // return dados;
    // }

    // //Despois de modificar, salva os dados no banco
    // @RequestMapping(value = "/acg/{id}/aval", method = RequestMethod.POST)
    // public ModelAndView editar(Solicitacao s) {
    // SolicitacaoDao dao = new SolicitacaoDao();
    // dao.update(s);
    // return null;
    // }

    // Avaliar
    // Primeiro carrega todos os dados da avaliacao
    @ResponseBody
    @GetMapping("/acg/{id}/avaliacao")
    public ResponseEntity buscaAvaliacaResponseEntity(@PathVariable("id") long id) {
        SolicitacaoDao dao = new SolicitacaoDao();
        Solicitacao s = dao.load(Solicitacao.class, id);
        String a = s.toString();
        dao.close();
        return ResponseEntity.ok(a);
    }

    // Despois de avaliar, salva os dados no banco
    @ResponseBody
    @PostMapping("/avaliar")
    @JsonView(View.Standard.class)
    public ResponseEntity avaliarSolicitacao(@Valid @RequestBody Solicitacao sol) throws SQLException {
        // Connection conect = connection();
        // PreparedStatement stmt = conect.prepareStatement("update from solicitacao where id=?");
        SolicitacaoDao dao = new SolicitacaoDao();
        // Solicitacao avaliar = sol;
        // avaliar.getIdsolicitacao;
        dao.persist(sol);
        dao.close();
        return ResponseEntity.ok(sol);
    }


    public Connection connection(){
       Connection connection = new Connection(){
       
           @Override
           public <T> T unwrap(Class<T> iface) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public boolean isWrapperFor(Class<?> iface) throws SQLException {
               // TODO Auto-generated method stub
               return false;
           }
       
           @Override
           public void setTypeMap(Map<String, Class<?>> map) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void setTransactionIsolation(int level) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void setSchema(String schema) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public Savepoint setSavepoint(String name) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public Savepoint setSavepoint() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public void setReadOnly(boolean readOnly) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void setNetworkTimeout(Executor executor, int milliseconds) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void setHoldability(int holdability) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void setClientInfo(String name, String value) throws SQLClientInfoException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void setClientInfo(Properties properties) throws SQLClientInfoException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void setCatalog(String catalog) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void setAutoCommit(boolean autoCommit) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void rollback(Savepoint savepoint) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void rollback() throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void releaseSavepoint(Savepoint savepoint) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public PreparedStatement prepareStatement(String sql, int resultSetType, int resultSetConcurrency,
                   int resultSetHoldability) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public PreparedStatement prepareStatement(String sql, int resultSetType, int resultSetConcurrency)
                   throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public PreparedStatement prepareStatement(String sql, String[] columnNames) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public PreparedStatement prepareStatement(String sql, int[] columnIndexes) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public PreparedStatement prepareStatement(String sql, int autoGeneratedKeys) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public PreparedStatement prepareStatement(String sql) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public CallableStatement prepareCall(String sql, int resultSetType, int resultSetConcurrency,
                   int resultSetHoldability) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public CallableStatement prepareCall(String sql, int resultSetType, int resultSetConcurrency) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public CallableStatement prepareCall(String sql) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public String nativeSQL(String sql) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public boolean isValid(int timeout) throws SQLException {
               // TODO Auto-generated method stub
               return false;
           }
       
           @Override
           public boolean isReadOnly() throws SQLException {
               // TODO Auto-generated method stub
               return false;
           }
       
           @Override
           public boolean isClosed() throws SQLException {
               // TODO Auto-generated method stub
               return false;
           }
       
           @Override
           public SQLWarning getWarnings() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public Map<String, Class<?>> getTypeMap() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public int getTransactionIsolation() throws SQLException {
               // TODO Auto-generated method stub
               return 0;
           }
       
           @Override
           public String getSchema() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public int getNetworkTimeout() throws SQLException {
               // TODO Auto-generated method stub
               return 0;
           }
       
           @Override
           public DatabaseMetaData getMetaData() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public int getHoldability() throws SQLException {
               // TODO Auto-generated method stub
               return 0;
           }
       
           @Override
           public String getClientInfo(String name) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public Properties getClientInfo() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public String getCatalog() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public boolean getAutoCommit() throws SQLException {
               // TODO Auto-generated method stub
               return false;
           }
       
           @Override
           public Struct createStruct(String typeName, Object[] attributes) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public Statement createStatement(int resultSetType, int resultSetConcurrency, int resultSetHoldability)
                   throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public Statement createStatement(int resultSetType, int resultSetConcurrency) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public Statement createStatement() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public SQLXML createSQLXML() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public NClob createNClob() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public Clob createClob() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public Blob createBlob() throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public Array createArrayOf(String typeName, Object[] elements) throws SQLException {
               // TODO Auto-generated method stub
               return null;
           }
       
           @Override
           public void commit() throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void close() throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void clearWarnings() throws SQLException {
               // TODO Auto-generated method stub
               
           }
       
           @Override
           public void abort(Executor executor) throws SQLException {
               // TODO Auto-generated method stub
               
           }
       };
        return null;
    }









    // //Armazena o anexo no banco de dados
    // @PostMapping("/upload")
    // public String postAnexo(@RequestParam("file") MultipartFile file, String nome) throws Exception {
    //     return anexoService.store(file, nome);
    // }
    // //Mostra todos os anexos do banco
    // @GetMapping("/anexos")
    // public String listUploadedFiles(Model model) throws IOException {
    //     model.addAttribute("files", anexoService.loadAll().map(
    //             path -> MvcUriComponentsBuilder.fromMethodName(SolicitacaoController.class,
    //                     "serveFile", path.getFileName().toString()).build().toString())
    //             .collect(Collectors.toList()));
    //     return "uploadForm";
    // }
    // @GetMapping("/files/{filename:.+}")
    // @ResponseBody
    // public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
    //     Resource file = anexoService.loadAsResource(filename);
    //     return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
    //             "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    // }
    //Metodo de salvar o anexo
    //public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
    //  Resource file = anexoService.loadAsResource(filename);
    //return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
    //      "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    //}
}
