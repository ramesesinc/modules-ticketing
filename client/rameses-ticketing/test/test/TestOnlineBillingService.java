/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package test;

import com.rameses.service.ScriptServiceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import junit.framework.TestCase;

/**
 *
 * @author ramesesinc
 */
public class TestOnlineBillingService extends TestCase {
    
    private ScriptServiceContext ssctx; 
    private Map env = new HashMap();
    
    ExecutorService threadPool = Executors.newCachedThreadPool(); 
    
    public TestOnlineBillingService(String testName) {
        super(testName);
    }
    
    @Override
    protected void setUp() throws Exception {
        super.setUp();

        env.put("USER", "sa");
        env.put("USERID", "sa");                
        
        Map appenv = new HashMap();
        appenv.put("app.host", "192.168.0.25:8075");
        appenv.put("app.cluster", "osiris3");
        appenv.put("app.context", "enterprise");
        appenv.put("readTimeout", "180000");
        appenv.put("connectTimeout", "5000");
        
        ssctx = new ScriptServiceContext( appenv );
    }
    
    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
    }

    public void testMain() throws Exception {
        final IService proxy = ssctx.create("gdx/OnlineTicketingService", env, IService.class);
        List routes = proxy.getRoutes();
        System.out.println("routes -> " + routes);
        
        System.out.println(" ");

        Map info = new HashMap();
        info.put("route", routes.get(0)); 
        info.put("tag", "TOURIST"); 
        info.put("numadult", 1); 
        info.put("numchildren", 0); 
        info.put("numsenior", 0); 
        info.put("numfil", 0); 
        info.put("numnonfil", 0); 
        
        Map bill = proxy.getBilling( info ); 
        System.out.println("bill -> "+ bill);
    }

    
    
    public interface IService { 
        List getRoutes();
        Map getBilling( Map arg0 );
    } 
    
}
