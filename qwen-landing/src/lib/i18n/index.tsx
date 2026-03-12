"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "zh" | "es";

interface Translations {
  [key: string]: string | Translations;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translationsData: Record<Language, Translations> = {
  en: {
    nav: {
      pricing: "Pricing",
      features: "Features",
      joinWaitlist: "Join Waitlist"
    },
    hero: {
      badge: "2026 Reseller Exclusive Pricing",
      title: "Stop Overpaying for",
      titleHighlight: "Thinking Models.",
      subtitle: "Access Alibaba's Qwen 0728 architecture with up to 99% savings compared to GPT-5.4 Pro. Guaranteed supply for enterprise high-volume workloads.",
      joinWaitlist: "Join the Waitlist",
      viewComparison: "View Comparison"
    },
    features: {
      guaranteedSupply: "Guaranteed Supply",
      guaranteedSupplyDesc: "Direct partnership with Alibaba Cloud infrastructure. No rate-limit headaches or mid-tier outages.",
      highVolume: "High Volume Ready",
      highVolumeDesc: "Scaling to billions of tokens? Our infrastructure is built for B2B aggregators and agents.",
      enterprise: "Enterprise-Ready",
      enterpriseDesc: "SOC2 Type II compliant pipelines, custom SLA options, and localized data residency support."
    },
    pricing: {
      title: "Compare Pricing",
      subtitle: "Massive savings on LLM tokens. No hidden fees.",
      inputTokens: "Monthly Input Tokens",
      outputTokens: "Monthly Output Tokens",
      calculateSavings: "Calculate Your Savings",
      savings: "You Save",
      perMonth: "per month",
      competitor: "Competitor",
      ourPrice: "Our Price",
      enterprise: "Enterprise",
      contactUs: "Contact Us",
      lastUpdated: "Last updated"
    },
    calculator: {
      subtitle: "See how much your business can save by switching to Qwen",
      currentlyUsing: "Currently Using",
      monthlyInput: "Monthly Input Tokens (Millions)",
      monthlyOutput: "Monthly Output Tokens (Millions)",
      savings: "savings",
      cta: "Ready to start saving? Join the priority waitlist."
    },
    testimonials: {
      title: "Trusted by Industry Leaders",
      subtitle: "Join 500+ companies already saving with QwenResell"
    },
    newsletter: {
      title: "Stay Updated",
      subtitle: "Get the latest on Qwen pricing and API updates.",
      placeholder: "Enter your email",
      button: "Subscribe",
      privacy: "We respect your privacy. Unsubscribe anytime.",
      success: {
        title: "You're in!",
        message: "Thanks for subscribing. We'll send updates to your inbox."
      },
      errors: {
        emailRequired: "Email is required",
        invalidEmail: "Please enter a valid email"
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about QwenResell",
      q1: "How is QwenResell able to offer such low prices?",
      a1: "We have a direct partnership with Alibaba Cloud, cutting out middlemen and negotiating volume discounts.",
      q2: "What about API reliability and uptime?",
      a2: "We offer 99.9% SLA guarantees with redundant infrastructure across multiple regions.",
      q3: "Can I migrate from my current provider?",
      a3: "Yes! We provide migration tools and support to help you switch.",
      q4: "Do you offer custom enterprise plans?",
      a4: "Absolutely. Contact us for custom pricing based on your volume needs.",
      q5: "What volume discounts do you offer?",
      a5: "We offer tiered pricing for high-volume users. Contact our sales team for a personalized quote.",
      q6: "How is the API different from direct Alibaba Cloud?",
      a6: "QwenResell provides simplified billing, English-language support, and volume discounts."
    },
    contact: {
      title: "Join the Waitlist",
      subtitle: "Get early access to enterprise pricing. No commitment required.",
      name: "Name",
      email: "Work Email",
      company: "Company",
      message: "How can we help?",
      submit: "Submit",
      sending: "Sending...",
      success: "Thanks! We'll be in touch soon.",
      nameError: "Please enter your name",
      emailError: "Please enter a valid work email",
      companyError: "Please enter your company name"
    },
    footer: {
      copyright: "2026 QwenResell API Services. All rights reserved."
    }
  },
  zh: {
    nav: {
      pricing: "价格",
      features: "功能",
      joinWaitlist: "加入等待列表"
    },
    hero: {
      badge: "2026年经销商专属定价",
      title: "停止为",
      titleHighlight: "思维模型支付过高费用。",
      subtitle: "通过阿里云Qwen 0728架构节省高达99%的费用,对比GPT-5.4 Pro。为企业大容量工作负载提供保证供应。",
      joinWaitlist: "加入等待列表",
      viewComparison: "查看对比"
    },
    features: {
      guaranteedSupply: "保证供应",
      guaranteedSupplyDesc: "与阿里云直接合作,无速率限制烦恼或中断问题。",
      highVolume: "大容量就绪",
      highVolumeDesc: "扩展到数十亿Token?我们的基础设施专为B2B聚合器和代理构建。",
      enterprise: "企业级",
      enterpriseDesc: "SOC2 Type II合规管道、定制SLA选项和本地化数据驻留支持。"
    },
    pricing: {
      title: "比较价格",
      subtitle: "大幅节省LLM Token费用。无隐藏费用。",
      inputTokens: "每月输入Token",
      outputTokens: "每月输出Token",
      calculateSavings: "计算您的节省",
      savings: "您节省",
      perMonth: "每月",
      competitor: "竞争对手",
      ourPrice: "我们的价格",
      enterprise: "企业版",
      contactUs: "联系我们",
      lastUpdated: "最后更新"
    },
    calculator: {
      subtitle: "看看切换到Qwen能为您的企业节省多少",
      currentlyUsing: "当前使用",
      monthlyInput: "每月输入Token(百万)",
      monthlyOutput: "每月输出Token(百万)",
      savings: "节省",
      cta: "准备开始节省?加入优先等待列表。"
    },
    testimonials: {
      title: "行业领导者信赖",
      subtitle: "已有500+家公司通过QwenResell节省成本"
    },
    newsletter: {
      title: "保持更新",
      subtitle: "获取最新的Qwen定价和API更新。",
      placeholder: "输入您的邮箱",
      button: "订阅",
      privacy: "我们尊重您的隐私。可随时取消订阅。",
      success: {
        title: "订阅成功!",
        message: "感谢订阅。我们会向您的邮箱发送更新。"
      },
      errors: {
        emailRequired: "请输入邮箱",
        invalidEmail: "请输入有效的邮箱地址"
      }
    },
    faq: {
      title: "常见问题",
      subtitle: "关于QwenResell您需要了解的一切",
      q1: "QwenResell如何能够提供如此低的价格?",
      a1: "我们与阿里云直接合作,削减中间商并谈判批量折扣。",
      q2: "API可靠性和正常运行时间如何?",
      a2: "我们提供99.9%SLA保证,跨多区域冗余基础设施。",
      q3: "我可以迁移到当前提供商吗?",
      a3: "是的!我们提供迁移工具和支持,帮助您切换。",
      q4: "你们提供定制企业计划吗?",
      a4: "当然可以。根据您的批量需求联系我们获取定制价格。",
      q5: "你们提供批量折扣吗?",
      a5: "我们为大容量用户提供分层定价。请联系我们的销售团队获取个性化报价。",
      q6: "API与直接使用阿里云有何不同?",
      a6: "QwenResell提供简化的计费、英语支持和批量折扣。"
    },
    contact: {
      title: "加入等待列表",
      subtitle: "提前获得企业定价访问权限。无需承诺。",
      name: "姓名",
      email: "工作邮箱",
      company: "公司",
      message: "我们能如何帮助您?",
      submit: "提交",
      sending: "发送中...",
      success: "感谢!我们将尽快与您联系。",
      nameError: "请输入您的姓名",
      emailError: "请输入有效的工作邮箱",
      companyError: "请输入您的公司名称"
    },
    footer: {
      copyright: "2026 QwenResell API Services版权所有。"
    }
  },
  es: {
    nav: {
      pricing: "Precios",
      features: "Características",
      joinWaitlist: "Unirse a la Lista"
    },
    hero: {
      badge: "Precio Exclusivo de Revendedor 2026",
      title: "Deja de Pagarlo de Más por",
      titleHighlight: "Modelos de Pensamiento.",
      subtitle: "Accede a la arquitectura Qwen 0728 de Alibaba con hasta 99% de ahorro comparado con GPT-5.4 Pro.",
      joinWaitlist: "Unirse a la Lista",
      viewComparison: "Ver Comparación"
    },
    features: {
      guaranteedSupply: "Suministro Garantizado",
      guaranteedSupplyDesc: "Asociación directa con Alibaba Cloud. Sin dolores de cabeza de límites de tasa.",
      highVolume: "Listo para Alto Volumen",
      highVolumeDesc: "¿Escalando a miles de millones de tokens? Nuestra infraestructura está construida para B2B.",
      enterprise: "Nivel Empresarial",
      enterpriseDesc: "Tuberías compatibles con SOC2 Tipo II y opciones SLA personalizadas."
    },
    pricing: {
      title: "Compara Precios",
      subtitle: "Ahorro masivo en tokens LLM. Sin tarifas ocultas.",
      inputTokens: "Tokens de Entrada Mensuales",
      outputTokens: "Tokens de Salida Mensuales",
      calculateSavings: "Calcula Tus Ahorros",
      savings: "Ahorras",
      perMonth: "por mes",
      competitor: "Competidor",
      ourPrice: "Nuestro Precio",
      enterprise: "Empresarial",
      contactUs: "Contáctanos",
      lastUpdated: "Última actualización"
    },
    calculator: {
      subtitle: "Mira cuánto puede ahorrar tu negocio cambiando a Qwen",
      currentlyUsing: "Actualmente Usando",
      monthlyInput: "Tokens de Entrada Mensuales (Millones)",
      monthlyOutput: "Tokens de Salida Mensuales (Millones)",
      savings: "ahorro",
      cta: "¿Listo para empezar a ahorrar? Únete a la lista de prioridad."
    },
    testimonials: {
      title: "Empresas Líderes Confían en Nosotros",
      subtitle: "Únete a más de 500 empresas ya ahorrando con QwenResell"
    },
    newsletter: {
      title: "Mantente Actualizado",
      subtitle: "Recibe las últimas noticias sobre precios de Qwen y actualizaciones de API.",
      placeholder: "Ingresa tu email",
      button: "Suscribirse",
      privacy: "Respetamos tu privacidad. Cancela cuando quieras.",
      success: {
        title: "¡Estás dentro!",
        message: "Gracias por suscribirte. Te enviaremos actualizaciones a tu bandeja."
      },
      errors: {
        emailRequired: "El email es requerido",
        invalidEmail: "Por favor ingresa un email válido"
      }
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre QwenResell",
      q1: "¿Cómo puede QwenResell ofrecer precios tan bajos?",
      a1: "Tenemos una asociación directa con Alibaba Cloud, eliminando intermediarios.",
      q2: "¿Qué pasa con la fiabilidad de la API?",
      a2: "Ofrecemos garantías SLA del 99.9% con infraestructura redundante.",
      q3: "¿Puedo migrar desde mi proveedor actual?",
      a3: "¡Sí! Proporcionamos herramientas de migración y soporte para ayudarte.",
      q4: "¿Ofrecen planes empresariales personalizados?",
      a4: "Absolutamente. Contáctanos para precios personalizados.",
      q5: "¿Qué descuentos por volumen ofrecen?",
      a5: "Ofrecemos precios por volumen. Contacta nuestro equipo de ventas.",
      q6: "¿Cómo es la API diferente de Alibaba Cloud directo?",
      a6: "QwenResell proporciona facturación simplificada y soporte en inglés."
    },
    contact: {
      title: "Únete a la Lista de Espera",
      subtitle: "Obtén acceso temprano a precios empresariales. Sin compromiso.",
      name: "Nombre",
      email: "Email de Trabajo",
      company: "Empresa",
      message: "¿Cómo podemos ayudar?",
      submit: "Enviar",
      sending: "Enviando...",
      success: "¡Gracias! Nos pondremos en contacto pronto.",
      nameError: "Por favor ingresa tu nombre",
      emailError: "Por favor ingresa un email válido",
      companyError: "Por favor ingresa el nombre de tu empresa"
    },
    footer: {
      copyright: "2026 QwenResell API Services. Todos los derechos reservados."
    }
  }
};

const languageNames: Record<Language, string> = {
  en: "English",
  zh: "中文",
  es: "Español",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored && translationsData[stored]) {
      // We need to set state from localStorage to avoid hydration mismatch
      // This is a valid use case for client-side hydration
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(stored);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: string | Translations = translationsData[language];
    for (const k of keys) {
      if (typeof result === "object" && result !== null && k in result) {
        result = result[k];
      } else {
        // Fallback to English
        result = translationsData.en;
        for (const fallbackKey of keys) {
          if (typeof result === "object" && result !== null && fallbackKey in result) {
            result = result[fallbackKey];
          } else {
            return key;
          }
        }
        break;
      }
    }
    return typeof result === "string" ? result : key;
  };

  // Always provide context - use English as default before mount
  const contextValue = { 
    language: mounted ? language : "en", 
    setLanguage, 
    t 
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return context;
}

export { languageNames };
